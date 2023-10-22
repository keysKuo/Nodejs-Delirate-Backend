use near_sdk::borsh::{ self, BorshDeserialize, BorshSerialize };
use near_sdk::serde::{ Deserialize, Serialize };
use near_sdk::collections::{ LookupMap, UnorderedMap };
use near_sdk::{ json_types::U128, env, near_bindgen, AccountId, Balance, PanicOnDefault, Promise };

pub type ItemId = String;
pub type HashEmail = String;
pub type RetailerId = HashEmail;
pub type CustomerId = HashEmail;

pub trait Delirate {
    fn register_customer(&mut self, hashed_email: HashEmail, name: String, phone: String) -> bool;
    fn get_customer_info(&self, hashed_email: HashEmail) -> Customer; 
    // fn register_retailer(&mut self, hashed_email: HashEmail, name: String, location: String) -> bool;

    // fn create_item(&mut self, model: String, desc: String, brand: String, origin: String) -> Item;
    
    // fn buy_item(&mut self, item_id: ItemId) -> Item;

    // fn sell_item(&mut self, item_id:ItemId) -> Item;
}

#[derive(Deserialize, BorshDeserialize, BorshSerialize, Serialize, PartialEq, Debug)]
#[serde(crate = "near_sdk::serde")]
pub struct Status {
    owner: CustomerId,
    note: String,
    image: String,
    location: String,
    timestamp: String
}


#[derive(BorshDeserialize, BorshSerialize, Deserialize, Serialize, PartialEq, Debug)]
#[serde(crate = "near_sdk::serde")]
pub struct Item {
    pub item_id: ItemId,
    pub model: String,
    pub desc: String,
    pub brand: String,
    pub origin: String,
    pub distributor: RetailerId,
    pub created_at: String,
    pub updated_at: String
}


#[derive(BorshDeserialize, BorshSerialize, Deserialize, Serialize)]
#[serde(crate = "near_sdk::serde")]
pub struct Customer {
    pub customer_id: CustomerId,
    pub name: String,
    pub phone: String,
    pub is_activated: bool
}

#[derive(BorshDeserialize, BorshSerialize, Deserialize, Serialize)]
#[serde(crate = "near_sdk::serde")]
pub struct Retailer {
    pub retailer_id: RetailerId,
    pub name: String,
    pub location: String
}


#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct Contract {
    pub owner: AccountId,

    // Customers
    pub all_customers: LookupMap<CustomerId, Customer>,
    pub total_customers: u128,

    // Retailers
    pub all_retailers: LookupMap<RetailerId, Retailer>,
    pub total_retailers: u128,

    // Items
    pub all_items: UnorderedMap<u128, Item>,
    pub total_items: u128,

    // Status
    pub status_map: LookupMap<ItemId, Vec<Status>>

}



// Implement the contract structure
#[near_bindgen]
impl Delirate for Contract {
    fn register_customer(&mut self, hashed_email: HashEmail, name: String, phone: String) -> bool {
        if self.all_customers.contains_key(&hashed_email) {
            return false;
        }

        let new_customer = Customer {
            customer_id: hashed_email.clone(),
            name, phone,
            is_activated: true
        };

        self.total_customers += 1;
        self.all_customers.insert(&hashed_email, &new_customer);
        return true;
    }

    fn get_customer_info(&self, hashed_email: HashEmail) -> Customer {
        self.all_customers.get(&hashed_email).unwrap()
    }

    // fn view_all_jobs(&self) -> Vec<Job> {
    //     let mut jobs = Vec::new();
        
    //     for i in 1..self.all_jobs.len() + 1 {
    //         if let Some(job) = self.all_jobs.get(&(i as u128)) {
    //             jobs.push(job);
    //         }
    //     }

    
    // fn register_executor(&mut self, fullname: String, skills: Vec<String>) -> FreeLancer {
    //     let id = env::signer_account_id();
    //     assert!(!self.freelancer_by_id.contains_key(&id), "This Freelancer has already existed");

    //     let new_freelancer = FreeLancer {
	// 		freelancer_id: env::signer_account_id(),
    //         fullname,
    //         skills,
    //         credit: 0,
    //         availability: Some(true),
    //     };
		
        
	// 	self.total_freelancers += 1;
	// 	self.freelancer_by_id.insert(&id, &new_freelancer);
    //     self.all_freelancers.insert(&self.total_freelancers, &new_freelancer);
    //     new_freelancer
    // }

    // fn register_client(&mut self, organization_name: String, industry: String) -> Client {
    //     let id = env::signer_account_id();
    //     assert!(!self.client_by_id.contains_key(&id), "This Client has been already existed");

    //     let new_client = Client {
	// 		client_id: env::signer_account_id(),
    //         organization_name,
    //         industry,
    //         credit: 0,
    //     };
		
        
	// 	self.total_clients += 1;
	// 	self.client_by_id.insert(&id, &new_client);
    //     self.all_clients.insert(&self.total_clients, &new_client);
    //     new_client
    // }
    // fn create_job(&mut self, title: String, desc: String, budget: Balance, tags: Vec<String>, duration: u64) -> Job {
    //     let id = env::signer_account_id();
    //     assert!(self.client_by_id.contains_key(&id), "Register first to be a Client");

    //     let _current = env::block_timestamp().to_string();
    
    //     let new_job = Job {
    //         job_id: "J-".to_string() + _current.as_str(),
    //         author: env::signer_account_id(),
    //         executor: None,
    //         title, desc, budget, tags, duration,
    //         created_at: _current,
    //         status: Status::Open
    //     };

    //     self.total_jobs += 1;
    //     self.all_jobs.insert(&self.total_jobs, &new_job);
    //     self.job_by_id.insert(&new_job.job_id, &new_job);
    //     self.jobs_by_owner.insert(&env::signer_account_id(), &new_job);
    //     new_job
    // }
    // fn take_job(&mut self, job_id: JobId) -> Job {
    //     // assert!(self.job_by_id.contains_key(&job_id), "This job doesn't exist");

    //     let id = env::signer_account_id();

    //     assert!(self.freelancer_by_id.contains_key(&id), "Register first to be a Freelancer");

    //     // let mut job = self.job_by_id.get(&job_id).unwrap();
    //     let mut job = self.view_job_by_id(job_id.clone());

    //     assert!(job.status == Status::Open, "This job has already been taken by other Freelancer");
    //     job.executor = Some(id.clone());
    //     job.status = Status::InProgress;

    //     self.job_by_id.insert(&job_id, &job);
    //     self.jobs_by_executor.insert(&id, &job);
    //     self.jobs_by_owner.insert(&job.author,  &job);
    //     self.all_jobs.insert(&self.index_of_job(job_id), &job);
    //     job
    // }
    // fn update_job(&mut self, job_id: JobId, title: Option<String>, desc: Option<String>, budget: Option<Balance>, tags: Option<Vec<String>>, duration: Option<u64>) -> Job {
    //     // assert!(self.job_by_id.contains_key(&job_id), "This job doesn't exist");

    //     let mut job = self.view_job_by_id(job_id.clone());
        
    //     if let Some(new_title) = title {
    //         job.title = new_title;
    //     }
    //     if let Some(new_desc) = desc {
    //         job.desc = new_desc;
    //     }
    //     if let Some(new_budget) = budget {
    //         job.budget = new_budget;
    //     }
    //     if let Some(new_tags) = tags {
    //         job.tags = new_tags;
    //     }
    //     if let Some(new_duration) = duration {
    //         job.duration = new_duration;
    //     }
        
    //     // Update the job in the data structures
    //     self.job_by_id.insert(&job_id, &job);
    //     self.jobs_by_owner.insert(&job.author, &job);
    //     job
    // }

    // fn remove_job(&mut self, job_id: JobId) -> Job {
    //     let job = self.view_job_by_id(job_id.clone());
        
    //     // assert!(self.job_by_id.contains_key(&job_id), "This job doesn't exist");
    //     assert_eq!(env::signer_account_id(), job.author, "You don't have authorization");
        
    //     self.job_by_id.remove(&job_id);
    //     self.jobs_by_owner.remove(&job.author);
    
    //     // self.all_jobs.remove(&(self.index_of_job(job_id)));
    //     let length: u128 = self.all_jobs.len() as u128; 
    //     for i in self.index_of_job(job_id)..length {
    //         if let Some(next_job) = self.all_jobs.get(&(i + 1)) {
    //             self.all_jobs.insert(&i, &next_job);
    //         }
            
    //     }

    //     self.all_jobs.remove(&(length));
    //     self.total_jobs -= 1;
    //     job
    // }


    // fn view_all_jobs(&self) -> Vec<Job> {
    //     let mut jobs = Vec::new();
        
    //     for i in 1..self.all_jobs.len() + 1 {
    //         if let Some(job) = self.all_jobs.get(&(i as u128)) {
    //             jobs.push(job);
    //         }
    //     }

    //     jobs
    // }
    // fn view_job_by_id(&self, job_id: JobId) -> Job {
    //     assert!(self.job_by_id.contains_key(&job_id), "This job doesn't exist");
    //     self.job_by_id.get(&job_id).unwrap()
    // }

    // #[payable]
    // fn payment(&mut self, amount: U128, receiver: AccountId) -> Promise {   
    //     Promise::new(receiver).transfer(amount.0) 
    // }

    // #[payable]
    // fn payment_test(&mut self, receiver: AccountId) -> Promise {
    //     Promise::new(receiver).transfer(env::attached_deposit()) 
    // }
    
    // #[payable]
    // fn pay_for_job(&mut self, job_id: JobId) -> u128 {
    //     let job = self.view_job_by_id(job_id.clone());

    //     assert_eq!(job.author, env::signer_account_id(), "You are not owner");
    //     if let Some(executor) = job.executor {
    //         let conversion_ratio: u128 = 1_000_000_000_000_000_000_000_000;
    //         let _budget: u128 = job.budget * conversion_ratio;
    //         assert!(_budget <= env::account_balance(), "Not enough currecy");

    //         self.payment(near_sdk::json_types::U128(_budget), executor);
    //         return _budget;
    //     }
    //     0
    // }
}


#[near_bindgen]
impl Contract {
    #[init]
    pub fn init() -> Self {
        Self {
            owner: env::signer_account_id(),

            all_customers: LookupMap::new(b"all customers".try_to_vec().unwrap()),
            all_retailers: LookupMap::new(b"all retailers".try_to_vec().unwrap()),
            all_items: UnorderedMap::new(b"all items".try_to_vec().unwrap()),

            status_map: LookupMap::new(b"status map".try_to_vec().unwrap()),

            total_customers: 0,
            total_retailers: 0,
            total_items: 0
        }
    }
}