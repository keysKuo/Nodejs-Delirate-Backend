use near_sdk::borsh::{ self, BorshDeserialize, BorshSerialize };
use near_sdk::serde::{ Deserialize, Serialize };
use near_sdk::collections::{ LookupMap, UnorderedMap };
use near_sdk::{ json_types::U128, env, near_bindgen, AccountId, Balance, PanicOnDefault, Promise };

pub type ItemId = String;
pub type HashEmail = String;
pub type RetailerId = HashEmail;
pub type CustomerId = HashEmail;
pub type ShipperId = HashEmail;

pub trait Delirate {
    fn register_customer(&mut self, hashed_email: HashEmail, name: String, phone: String) -> bool;
    fn get_customer_info(&self, hashed_email: HashEmail) -> Customer;

    fn register_retailer(&mut self, hashed_email: HashEmail, store_name: String, _location: String) -> bool;
    fn get_retailer_info(&self, hashed_email: HashEmail) -> Retailer;

    fn register_shipper(&mut self, hashed_email: HashEmail, license_num: String, phone: String) -> bool;
    fn get_shipper_info(&self, hashed_email: HashEmail) -> Shipper;

    fn create_delivery(
        &mut self, 
        _isbn_code: String, // FK order _isbn_code
        _sender: RetailerId, 
        _receiver: CustomerId,
        _status: String,
        _note: String,
        _image: String,
        _location: String,
        _track_signer: HashEmail
    ) -> bool;

    fn tracking_delivery(
        &mut self,
        _isbn_code: String,
        _status: String,
        _note: String,
        _image: String,
        _location: String,
        _track_signer: String
    ) -> bool;

    fn get_delivery_info(&self, _isbn_code: String) -> Delivery;

    /**
     * Description: Create an item on retailer's shop
     * Send:        Datas which contains model, desc, brand, origin, distributor
     * Receive:     Return true if success, otherwise false 
     */
    fn create_item(&mut self, model: String, desc: String, brand: String, origin: String, _image: String, distributor: RetailerId) -> bool;

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

    fn payment_test(&mut self, _receiver: AccountId, _order_id: String, _amount: Balance) -> Promise;

    // fn buy_item(&mut self, item_id: ItemId) -> Item;

    // fn sell_item(&mut self, item_id:ItemId) -> Item;
}



#[derive(Deserialize, BorshDeserialize, BorshSerialize, Serialize, PartialEq, Debug)]
#[serde(crate = "near_sdk::serde")]
pub struct Delivery {
    _isbn_code: String, // FK order _isbn_code
    _sender: RetailerId, 
    _receiver: CustomerId,
    _tracking_history: Vec<Tracking>
}
#[derive(Deserialize, BorshDeserialize, BorshSerialize, Serialize, PartialEq, Debug)]
#[serde(crate = "near_sdk::serde")]
pub struct Tracking {
    _status: String,
    _note: String,
    _image: String,
    _location: String,
    _track_signer: HashEmail,
    _timestamp: String
}

#[derive(Deserialize, BorshDeserialize, BorshSerialize, Serialize, PartialEq, Debug)]
#[serde(crate = "near_sdk::serde")]
pub struct Retailer {
    store_name: String,
    _location: String
}

#[derive(Deserialize, BorshDeserialize, BorshSerialize, Serialize, PartialEq, Debug)]
#[serde(crate = "near_sdk::serde")]
pub struct Customer {
    name: String,
    phone: String
}

#[derive(Deserialize, BorshDeserialize, BorshSerialize, Serialize, PartialEq, Debug)]
#[serde(crate = "near_sdk::serde")]
pub struct Shipper {
    license_num: String,
    phone: String
}

#[derive(Deserialize, BorshDeserialize, BorshSerialize, Serialize, PartialEq, Debug)]
#[serde(crate = "near_sdk::serde")]
pub struct Checkout {
    _isbn_code: String, // FK order
    payment_type: String,
    is_completed: bool,
    created_at: String
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
    pub _image: String,
    pub distributor: RetailerId
}


// Structure of Contract
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct Contract {
    pub owner: AccountId,

    // Items
    pub all_items: UnorderedMap<u128, Item>,
    pub items_by_id: LookupMap<ItemId, Item>,
    pub total_items: u128,

    // Delivery
    pub delivery_by_id: LookupMap<String, Delivery>,
    pub total_delivery: u128,
    
    // Checkout
    pub checkout_by_id: LookupMap<String, Checkout>,
    pub total_checkout: u128,

    // Customers
    pub customers_by_id: LookupMap<CustomerId, Customer>,
    pub total_customers: u128,

    // Retailers
    pub retailers_by_id: LookupMap<RetailerId, Retailer>,
    pub total_retailers: u128,

    // Shippers
    pub shippers_by_id: LookupMap<ShipperId, Shipper>,
    pub total_shippers: u128

}



// Implement the contract structure
#[near_bindgen]
impl Delirate for Contract {
    fn register_customer(&mut self, hashed_email: HashEmail, name: String, phone: String) -> bool {
        let new_customer = Customer {
            name, phone
        };

        self.total_customers += 1;
        self.customers_by_id.insert(&hashed_email, &new_customer);
        return true;
    }


    fn get_customer_info(&self, hashed_email: HashEmail) -> Customer {
        self.customers_by_id.get(&hashed_email).unwrap()
    }

    fn register_retailer(&mut self, hashed_email: HashEmail, store_name: String, _location: String) -> bool {
        let new_retailer = Retailer {
            store_name, _location
        };

        self.total_retailers += 1;
        self.retailers_by_id.insert(&hashed_email, &new_retailer);
        return true;
    }

    fn get_retailer_info(&self, hashed_email: HashEmail) -> Retailer {
        self.retailers_by_id.get(&hashed_email).unwrap()
    }


    fn register_shipper(&mut self, hashed_email: HashEmail, license_num: String, phone: String) -> bool {
        let new_shipper = Shipper {
            license_num, phone
        };

        self.total_shippers += 1;
        self.shippers_by_id.insert(&hashed_email, &new_shipper);
        return true;
    }

    fn get_shipper_info(&self, hashed_email: HashEmail) -> Shipper {
        self.shippers_by_id.get(&hashed_email).unwrap()
    }

    
    fn create_delivery(
        &mut self, 
        _isbn_code: String, // FK order _isbn_code
        _sender: RetailerId, 
        _receiver: CustomerId,
        _status: String,
        _note: String,
        _image: String,
        _location: String,
        _track_signer: HashEmail
    ) -> bool {
        if self.delivery_by_id.contains_key(&_isbn_code) {
            return false;
        }

        let mut new_delivery = Delivery {
            _isbn_code: _isbn_code.clone(), _sender, _receiver,
            _tracking_history: Vec::new()
        };

        let new_tracking = Tracking {
            _status, _note, _image, _location, _track_signer,
            _timestamp: env::block_timestamp().to_string()
        };

        new_delivery._tracking_history.push(new_tracking);

        self.delivery_by_id.insert(&_isbn_code, &new_delivery);
        self.total_delivery += 1;
        return true;
    }

    fn tracking_delivery(
        &mut self,
        _isbn_code: String,
        _status: String,
        _note: String,
        _image: String,
        _location: String,
        _track_signer: String
    ) -> bool {
        if !self.delivery_by_id.contains_key(&_isbn_code) {
            return false;
        }

        let mut delivery = self.delivery_by_id.get(&_isbn_code.clone()).unwrap();
        
        let new_tracking = Tracking {
            _status, _note, _image, _location, _track_signer,
            _timestamp: env::block_timestamp().to_string()
        };

        delivery._tracking_history.push(new_tracking);

        self.delivery_by_id.insert(&_isbn_code, &delivery);
        return true;
    }

    fn get_delivery_info(&self, _isbn_code: String) -> Delivery {
        self.delivery_by_id.get(&_isbn_code).unwrap()
    }

    fn create_item(&mut self, model: String, desc: String, brand: String, origin: String, _image: String, distributor: RetailerId) -> bool {
        if !self.retailers_by_id.contains_key(&distributor) {
            return false;
        }

        let current_timestamp = env::block_timestamp().to_string();
        let item_id = "I".to_string() + current_timestamp.as_str();

        let new_item = Item {
            item_id: item_id.clone(), model, desc, brand, origin, _image, distributor
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
    // fn payment(&mut self, amount: U128, _receiver: AccountId) -> Promise {   
    //     Promise::new(_receiver).transfer(amount.0) 
    // }

    #[payable]
    fn payment_test(&mut self, _receiver: AccountId, _order_id: String, _amount: Balance) -> Promise {
        Promise::new(_receiver).transfer(env::attached_deposit()) 
    }
    
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

            customers_by_id: LookupMap::new(b"all customers".try_to_vec().unwrap()),
            retailers_by_id: LookupMap::new(b"all retailers".try_to_vec().unwrap()),
            shippers_by_id: LookupMap::new(b"all shippers".try_to_vec().unwrap()),
            delivery_by_id: LookupMap::new(b"all delivery".try_to_vec().unwrap()),
            checkout_by_id: LookupMap::new(b"all checkout".try_to_vec().unwrap()),
            all_items: UnorderedMap::new(b"all items".try_to_vec().unwrap()),
            items_by_id: LookupMap::new(b"items by id".try_to_vec().unwrap()),

            total_customers: 0,
            total_retailers: 0,
            total_shippers: 0,
            total_items: 0,
            total_delivery: 0,
            total_checkout: 0
        }
    }
}