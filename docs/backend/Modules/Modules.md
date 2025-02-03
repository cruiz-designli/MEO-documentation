---
sidebar_position: 2
---


# Modules

The system is designed based on DDD principles, where a module defines an entity and its behavior. 

## Module structure

Each module is categorized into one of the following types:	

	- CRUD: The module is responsible for creating, reading, updating, and deleting data.
	- Computational: The module is responsible for calculating data based on the inputs. Modules of this type are used to calculate dependencies, mitigations, and other data, the details of the calculations are provided in the table below.
	- Informative: The module is responsible for providing information to the user.

Each module is also assigned to a main MEO section, which is the main area of the application where the module is used.

:::tip Business logic
Its recomended to use [this spreadsheet](https://docs.google.com/spreadsheets/d/1ORAhk6oRgwZRfJDXoinDh0bAdkJi-_nT) to understand the MEO application business logic and core functionalities.
:::

## Modules list

| Module                  | Category      | Main MEO section                | Calculation details                                                                                                                    |
| ----------------------- | ------------- | ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| auth0                   | CRUD          | Auth                            |                                                                                                                                        |
| communication-plan      | CRUD          | BCP hub                         |                                                                                                                                        |
| consideration           | CRUD          | BCP hub                         |                                                                                                                                        |
| corporate-financial     | CRUD          | BCP hub                         |                                                                                                                                        |
| crisis-management-team  | CRUD          | BCP hub                         |                                                                                                                                        |
| dependency              | Computational | Location dependency mapping     | [Dependency summary](https://docs.google.com/spreadsheets/d/1ORAhk6oRgwZRfJDXoinDh0bAdkJi-_nT/edit?gid=582580791#gid=582580791)        |
| division-financial      | Computational | Division financial data inputs  | [Financial](https://docs.google.com/spreadsheets/d/1ORAhk6oRgwZRfJDXoinDh0bAdkJi-_nT/edit?gid=551706578#gid=551706578)                 |
| document-link           | CRUD          | BCP hub                         |                                                                                                                                        |
| facility                | CRUD          | BCP hub                         |                                                                                                                                        |
| hardware                | CRUD          | BCP hub                         |                                                                                                                                        |
| hosting-location        | CRUD          | Cyber module                    |                                                                                                                                        |
| inbound-material        | CRUD          | BCP hub                         |                                                                                                                                        |
| individual              | CRUD          | BCP hub                         |                                                                                                                                        |
| inventory               | CRUD          | BCP hub                         |                                                                                                                                        |
| it-application          | Computational | Cyber module                    |                                                                                                                                        |
| it-resource             | CRUD          | BCP hub                         |                                                                                                                                        |
| location                | Computational | Location data inputs            | [Locations](https://docs.google.com/spreadsheets/d/1ORAhk6oRgwZRfJDXoinDh0bAdkJi-_nT/edit?gid=898550776#gid=898550776)                 |
| locations-to-mitigate   | CRUD          | Location mitigation             |                                                                                                                                        |
| mailer                  | Informative   | BCP hub                         |                                                                                                                                        |
| materials               | CRUD          | BCP hub                         |                                                                                                                                        |
| migrator                | CRUD          | BCP hub                         |                                                                                                                                        |
| mitigation              | Computational | Location mitigation             | [Mitigation](https://docs.google.com/spreadsheets/d/1ORAhk6oRgwZRfJDXoinDh0bAdkJi-_nT/edit?gid=2009282312#gid=2009282312)              |
| outbound-material       | CRUD          | BCP hub                         |                                                                                                                                        |
| panel                   | CRUD          | Auth                            |                                                                                                                                        |
| pdf-creator             | Informative   | BCP hub                         |                                                                                                                                        |
| people                  | CRUD          | BCP hub                         |                                                                                                                                        |
| plan-activation         | CRUD          | BCP hub                         |                                                                                                                                        |
| prisma                  | CRUD          | General CRUD                    |                                                                                                                                        |
| procesess-dependency    | Computational | Process dependency mapping      | [Dependency summary](https://docs.google.com/spreadsheets/d/1ORAhk6oRgwZRfJDXoinDh0bAdkJi-_nT/edit?gid=798134476#gid=798134476)        |
| process-area            | Computational | Process area data inputs        | [Process areas](https://docs.google.com/spreadsheets/d/1ORAhk6oRgwZRfJDXoinDh0bAdkJi-_nT/edit?gid=1252880254#gid=1252880254)           |
| process-area-dependency | Computational | Process area dependency mapping | [Dependency summary](https://docs.google.com/spreadsheets/d/1ORAhk6oRgwZRfJDXoinDh0bAdkJi-_nT/edit?gid=798134476#gid=798134476)        |
| process-area-mitigation | Computational | Process area mitigation         | [Process area mitigation](https://docs.google.com/spreadsheets/d/1ORAhk6oRgwZRfJDXoinDh0bAdkJi-_nT/edit?gid=1016637541#gid=1016637541) |
| processes               | Computational | Process data inputs             | [Processes](https://docs.google.com/spreadsheets/d/1ORAhk6oRgwZRfJDXoinDh0bAdkJi-_nT/edit?gid=1252880254#gid=1252880254)               |
| processes-mitigation    | Computational | Process mitigation              | [Process mitigation](https://docs.google.com/spreadsheets/d/1ORAhk6oRgwZRfJDXoinDh0bAdkJi-_nT/edit?gid=1016637541#gid=1016637541)      |
| product-financial       | CRUD          | Product data inputs             | [Financial](https://docs.google.com/spreadsheets/d/1ORAhk6oRgwZRfJDXoinDh0bAdkJi-_nT/edit?gid=551706578#gid=551706578)                 |
| product-group-financial | CRUD          | Product group data inputs       | [Financial](https://docs.google.com/spreadsheets/d/1ORAhk6oRgwZRfJDXoinDh0bAdkJi-_nT/edit?gid=551706578#gid=551706578)                 |
| production-equipment    | CRUD          | BCP hub                         |                                                                                                                                        |
| recovery-plan           | CRUD          | BCP hub                         |                                                                                                                                        |
| response-plan           | CRUD          | BCP hub                         |                                                                                                                                        |
| risk-hub                | Computational | Risk hub                        |                                                                                                                                        |
| role                    | CRUD          | Auth                            |                                                                                                                                        |
| section-owner           | CRUD          | BCP hub                         |                                                                                                                                        |
| software                | CRUD          | BCP hub                         |                                                                                                                                        |
| stake-holder-group      | CRUD          | BCP hub                         |                                                                                                                                        |
| statement               | CRUD          | BCP hub                         |                                                                                                                                        |
| strategy                | CRUD          | BCP hub                         |                                                                                                                                        |
| supplier                | CRUD          | BCP hub                         |                                                                                                                                        |
| supply-chain            | CRUD          | BCP hub                         |                                                                                                                                        |
| update                  | Computational | Event propagation / data sync   | [Event propagation](/docs/backend/Modules/Events)                                                                                      |
| user                    | CRUD          | Auth                            |                                                                                                                                        |
| user-panel              | CRUD          | Auth                            |                                                                                                                                        |
| user-permission         | CRUD          | Auth                            |                                                                                                                                        |
| user-role               | CRUD          | Auth                            |                                                                                                                                        |

