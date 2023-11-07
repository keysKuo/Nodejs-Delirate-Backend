use near_sdk::borsh::{ self, BorshDeserialize, BorshSerialize };
use near_sdk::serde::{ Deserialize, Serialize };
use near_sdk::collections::{ LookupMap, UnorderedMap };
use near_sdk::{ json_types::U128, env, near_bindgen, AccountId, Balance, PanicOnDefault, Promise };

pub type ItemId = String;
pub type HashEmail = String;
pub type RetailerId = HashEmail;
pub type CustomerId = HashEmail;

pub trait Delirate {

    /**
     * Description: Register to be a customer
     * Send:        Datas which contains hashed_email, name, phone
     * Receive:     Return true if success, otherwise false
     */
    fn register_customer(&mut self, hashed_email: HashEmail, name: String, phone: String) -> bool;

    /**
     * Description: Get infomation of a specific customer by his/her hashed_email
     * Send:        Datas which contains hashed_email
     * Receive:     Return that customer's information
     */
    fn get_customer_info(&self, hashed_email: HashEmail) -> Customer; 

    /**
     * Description: Register to be a Retailer
     * Send:        Datas which contains hashed_email, name, location
     * Receive:     Return true if success, otherwise false
     */
    fn register_retailer(&mut self, hashed_email: HashEmail, name: String, location: String) -> bool;

    /**
     * Description: Get infomation of a specific retailer by their hashed_email
     * Send:        Datas which contains hashed_email
     * Receive:     Return that retailer's information
     */
    fn get_retailer_info(&self, hashed_email: HashEmail) -> Retailer;

    /**
     * Description: Create an item on retailer's shop
     * Send:        Datas which contains model, desc, brand, origin, distributor
     * Receive:     Return true if success, otherwise false 
     */
    fn create_item(&mut self, model: String, desc: String, brand: String, origin: String, image: String, distributor: RetailerId) -> bool;

    /**
     * Description: Get infomation of a specific item by item_id
     * Send:        Datas which contains item_id
     * Receive:     Return that item's information
     */
    fn get_item_info(&self, item_id: ItemId) -> Item;

    /**
     * Description: Get infomation of a all items
     * Send:        No data sent
     * Receive:     Return all item's information
     */
    fn get_all_items(&self) -> Vec<Item>;

    // fn buy_item(&mut self, item_id: ItemId) -> Item;

    // fn sell_item(&mut self, item_id:ItemId) -> Item;
}

// Stucture of Item's Delivery

#[derive(Deserialize, BorshDeserialize, BorshSerialize, Serialize, PartialEq, Debug)]
#[serde(crate = "near_sdk::serde")]
pub struct Delivery {
    ISBN_code: String,
    sender: String,
    receiver: String,
    status: String,
    note: String,
    image: String,
    location: String,
    signer: AccountId,
    timestamp: String
}

// Structure of Item
#[derive(BorshDeserialize, BorshSerialize, Deserialize, Serialize, PartialEq, Debug)]
#[serde(crate = "near_sdk::serde")]
pub struct Item {
    pub item_id: ItemId,
    pub model: String,
    pub desc: String,
    pub brand: String,
    pub origin: String,
    pub image: String,
    pub distributor: RetailerId,
    pub created_at: String,
    pub updated_at: String
}


// Structure of Customer
#[derive(BorshDeserialize, BorshSerialize, Deserialize, Serialize)]
#[serde(crate = "near_sdk::serde")]
pub struct Customer {
    pub customer_id: CustomerId,
    pub name: String,
    pub phone: String,
    pub is_activated: bool
}

// Structure of Retailer
#[derive(BorshDeserialize, BorshSerialize, Deserialize, Serialize, Debug)]
#[serde(crate = "near_sdk::serde")]
pub struct Retailer {
    pub retailer_id: RetailerId,
    pub name: String,
    pub location: String
}

// Structure of Contract
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
    pub items_by_id: LookupMap<ItemId, Item>,
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

    fn register_retailer(&mut self, hashed_email: HashEmail, name: String, location: String) -> bool {
        let new_retailer = Retailer {
            retailer_id: hashed_email.clone(),
            name, location
        };

        self.total_retailers += 1;
        self.all_retailers.insert(&hashed_email, &new_retailer);
        return true;
    }

    fn get_retailer_info(&self, hashed_email: HashEmail) -> Retailer {
        self.all_retailers.get(&hashed_email).unwrap()
    }

    fn create_item(&mut self, model: String, desc: String, brand: String, origin: String, image: String, distributor: RetailerId) -> bool {
        if !self.all_retailers.contains_key(&distributor) {
            return false;
        }

        let current_timestamp = env::block_timestamp().to_string();
        let item_id = "I".to_string() + current_timestamp.as_str();

        let new_item = Item {
            item_id: item_id.clone(), model, desc, brand, origin, image, distributor,
            created_at: current_timestamp.clone(),
            updated_at: current_timestamp.clone()
        };

        self.total_items += 1;
        self.all_items.insert(&self.total_items, &new_item);
        self.items_by_id.insert(&item_id, &new_item);
        return true;
    }

    fn get_item_info(&self, item_id: ItemId) -> Item {
        self.items_by_id.get(&item_id).unwrap()
    }

    fn get_all_items(&self) -> Vec<Item> {
        let mut items = Vec::new();
        
        for i in 1..self.all_items.len() + 1 {
            if let Some(item) = self.all_items.get(&(i as u128)) {
                items.push(item);
            }
        }

        items
    }


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

// Implement Contract
#[near_bindgen]
impl Contract {
    #[init]
    pub fn init() -> Self {
        Self {
            owner: env::signer_account_id(),

            all_customers: LookupMap::new(b"all customers".try_to_vec().unwrap()),
            all_retailers: LookupMap::new(b"all retailers".try_to_vec().unwrap()),
            all_items: UnorderedMap::new(b"all items".try_to_vec().unwrap()),
            items_by_id: LookupMap::new(b"items by id".try_to_vec().unwrap()),

            status_map: LookupMap::new(b"status map".try_to_vec().unwrap()),

            total_customers: 0,
            total_retailers: 0,
            total_items: 0
        }
    }
}