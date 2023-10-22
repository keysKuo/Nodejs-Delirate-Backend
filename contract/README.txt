. Deploy Code
    npm i -g near-cli
    cargo make prepare 
    cargo make build 
    cargo make dev-deploy

. Register Freelancer
    cargo make call register_executor '{"fullname": "Kuo Nhan Dung", "skills": ["Nodejs","MongoDB"]}' --account-id nkeyskuo124.testnet

. Register Client
    cargo make call register_client '{"organization_name": "SUD Tech", "industry": "Information Technology"}' --account-id nkeyskuo124.testnet

. Create job 
    cargo make call create_job '{"title": "Ticket Buying System", "desc": "Developing a Ticket Buying Platform ...", "budget": 5, "tags": ["ExpressJs","ReactJs","MongoDB"], "duration": 30}' --account-id nkeyskuo124.testnet
    cargo make call create_job '{"title": "Food Ordering System", "desc": "Build an Ordering System for restaurants", "budget": 20, "tags": ["PHP","VueJs","MySQL"], "duration": 20}' --account-id nkeyskuo124.testnet
    cargo make call create_job '{"title": "Social Communication System", "desc": "...", "budget": 10, "tags": ["GoLang","VueJs","MySQL", "GraphQL"], "duration": 30}' --account-id nkeyskuo124.testnet
    cargo make call create_job '{"title": "Media Player System", "desc": "...", "budget": 2, "tags": ["GoLang","AngularJs", "GraphQL"], "duration": 20}' --account-id nkeyskuo124.testnet
. Take job
    cargo make call take_job '{"job_id": "J-1689271438776764125"}' --account-id nkeyskuo124.testnet

. View job by id
    cargo make call view_job_by_id '{"job_id": "J-1689271438776764125"}' --account-id nkeyskuo124.testnet

. Update job 
    cargo make call update_job '{"job_id": "J-1689271438776764125", "budget": 4}' --account-id nkeyskuo124.testnet
    cargo make call update_job '{"job_id": "J-1689289254227678863", "duration": 15}' --account-id nkeyskuo124.testnet
    
. Remove job 
    cargo make call remove_job '{"job_id": "J-1689289254227678863"}' --account-id nkeyskuo124.testnet

. View all jobs
    cargo make view view_all_jobs

    Result:
        [
            {
                job_id: 'J-1689271438776764125',
                author: 'nkeyskuo124.testnet',
                executor: null,
                title: 'Ticket Buying System',
                desc: 'Developing a Ticket Buying Platform ...',
                budget: 5,
                tags: [ 'ExpressJs', 'ReactJs', 'MongoDB' ],
                created_at: '1689271438776764125',
                duration: 5,
                status: 'open'
            },
            {
                job_id: 'J-1689289254227678863',
                author: 'nkeyskuo124.testnet',
                executor: null,
                title: 'Food Ordering System',
                desc: 'Build an Ordering System for restaurants',
                budget: 20,
                tags: [ 'PHP', 'VueJs', 'MySQL' ],
                created_at: '1689289254227678863',
                duration: 2,
                status: 'open'
            }
        ]

. Clear Jobs 
    cargo make call clear_jobs '{}' --account-id nkeyskuo124.testnet

. View Freelancer 
    cargo make call view_freelancer_by_id --account-id nkeyskuo124.testnet

. Payment 
    cargo make call pay_for_job '{"job_id": "J-1695675109179875436"}' --account-id nkeyskuo124.testnet 
