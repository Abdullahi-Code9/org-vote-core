#![no_std]

use soroban_sdk::{contract, contractimpl, contracttype, Address, Env, String, Vec};

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Poll {
    pub id: u32,
    pub title: String,
    pub options: Vec<String>,
    pub vote_counts: Vec<u32>,
    pub creator: Address,
}

#[contracttype]
pub enum DataKey {
    PollCount,
    Poll(u32),
    Voted(u32, Address),
}

#[contract]
pub struct OrgVote;

#[contractimpl]
impl OrgVote {
    /// Create a new poll with a title and list of option labels.
    /// Returns the assigned poll ID.
    pub fn create_poll(env: Env, creator: Address, title: String, options: Vec<String>) -> u32 {
        creator.require_auth();

        let option_count = options.len();
        if option_count < 2 {
            panic!("poll must have at least two options");
        }

        let poll_id: u32 = env
            .storage()
            .instance()
            .get(&DataKey::PollCount)
            .unwrap_or(0);
        let next_id = poll_id + 1;

        let mut vote_counts = Vec::new(&env);
        for _ in 0..option_count {
            vote_counts.push_back(0);
        }

        let poll = Poll {
            id: next_id,
            title,
            options,
            vote_counts,
            creator,
        };

        env.storage().instance().set(&DataKey::PollCount, &next_id);
        env.storage().instance().set(&DataKey::Poll(next_id), &poll);

        next_id
    }

    /// Cast a vote for a given poll option. Each voter may vote only once per poll.
    pub fn cast_vote(env: Env, poll_id: u32, option_index: u32, voter: Address) {
        voter.require_auth();

        let vote_key = DataKey::Voted(poll_id, voter.clone());
        if env.storage().instance().has(&vote_key) {
            panic!("voter has already voted in this poll");
        }

        let mut poll: Poll = env
            .storage()
            .instance()
            .get(&DataKey::Poll(poll_id))
            .expect("poll not found");

        let idx = option_index as u32;
        if idx as usize >= poll.options.len() {
            panic!("invalid option index");
        }

        let current = poll.vote_counts.get(idx).unwrap_or(0);
        poll.vote_counts.set(idx, current + 1);

        env.storage().instance().set(&DataKey::Poll(poll_id), &poll);
        env.storage().instance().set(&vote_key, &true);
    }

    /// Retrieve poll metadata and current vote tallies.
    pub fn get_poll(env: Env, poll_id: u32) -> Poll {
        env.storage()
            .instance()
            .get(&DataKey::Poll(poll_id))
            .expect("poll not found")
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use soroban_sdk::{testutils::Address as _, Env, String, Vec};

    fn setup() -> (Env, Address, OrgVoteClient<'static>) {
        let env = Env::default();
        env.mock_all_auths();
        let contract_id = env.register(OrgVote, ());
        let client = OrgVoteClient::new(&env, &contract_id);
        let creator = Address::generate(&env);
        (env, creator, client)
    }

    #[test]
    fn create_and_get_poll() {
        let (env, creator, client) = setup();

        let mut options = Vec::new(&env);
        options.push_back(String::from_str(&env, "Yes"));
        options.push_back(String::from_str(&env, "No"));

        let poll_id = client.create_poll(
            &creator,
            &String::from_str(&env, "Approve budget?"),
            &options,
        );

        assert_eq!(poll_id, 1);

        let poll = client.get_poll(&poll_id);
        assert_eq!(poll.title, String::from_str(&env, "Approve budget?"));
        assert_eq!(poll.vote_counts.len(), 2);
        assert_eq!(poll.vote_counts.get(0).unwrap(), 0);
    }

    #[test]
    fn cast_vote_and_tally() {
        let (env, creator, client) = setup();

        let mut options = Vec::new(&env);
        options.push_back(String::from_str(&env, "Alice"));
        options.push_back(String::from_str(&env, "Bob"));

        let poll_id = client.create_poll(
            &creator,
            &String::from_str(&env, "Board election"),
            &options,
        );

        let voter = Address::generate(&env);
        client.cast_vote(&poll_id, &0, &voter);

        let poll = client.get_poll(&poll_id);
        assert_eq!(poll.vote_counts.get(0).unwrap(), 1);
        assert_eq!(poll.vote_counts.get(1).unwrap(), 0);
    }

    #[test]
    #[should_panic(expected = "voter has already voted in this poll")]
    fn double_vote_rejected() {
        let (env, creator, client) = setup();

        let mut options = Vec::new(&env);
        options.push_back(String::from_str(&env, "A"));
        options.push_back(String::from_str(&env, "B"));

        let poll_id = client.create_poll(
            &creator,
            &String::from_str(&env, "Single vote test"),
            &options,
        );

        let voter = Address::generate(&env);
        client.cast_vote(&poll_id, &0, &voter);
        client.cast_vote(&poll_id, &1, &voter);
    }
}
