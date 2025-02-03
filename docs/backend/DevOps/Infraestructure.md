---
sidebar_position: 3
---

import ImageSwitcher from '../../../src/components/ImageSwitcher/ImageSwitcher';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


# Infraestructure

<ImageSwitcher 
lightImageSrc="/img/c&c-light.svg"
darkImageSrc="/img/c&c-dark.svg"/>

## [AWS](https://aws.amazon.com)

The infrastructure is hosted on `AWS`, providing a scalable and secure environment for the application.

### [Amplify](https://aws.amazon.com/amplify/)
The frontend is hosted on `Amplify`, which provides a simple way to host the frontend application. Also it provides a way to manage the domain and SSL certificates and to trigger the deployment when the code is pushed to the repository.

### [ECS Fargate](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html)
The backend is hosted on `ECS` using the `Fargate` compute core, which provides a way to run containers without having to manage the underlying infrastructure. This allows the application to scale easily and to be deployed with minimal effort.

### [RDS](https://aws.amazon.com/rds/)
The databases are hosted on `RDS`, which provides a managed database service that is easy to scale and secure. Each client has its own database, hosted on one RDS instance.

### [S3](https://aws.amazon.com/s3/)
To generate pdf reports, the application uses `S3` to store the generated reports. This allows the application to generate reports without having to store them on the server. The applications implements a system that cleans the reports after a certain amount of time.

### [SES](https://aws.amazon.com/ses/)
The application uses `SES` to send reports via email. This allows the application to send reports to clients without having to manage the email server.

## [Auth0](https://auth0.com)
For the authenticatio, the application uses `Auth0`, which provides a secure and scalable way to manage users. Each client has its own organization in `Auth0`. 

There are also some custom scripts used to manage the users SSO that are implemented in the Auth0 actions login trigger.

<ImageSwitcher 
lightImageSrc="/img/auth0-flow-light.png"
darkImageSrc="/img/auth0-flow-dark.png"/>


<Tabs>
	<TabItem value="link-identity" label="Link Identity" default>
```js
exports.onExecutePostLogin = async (event, api) => {
	const { ManagementClient } = require('auth0')

	const { CLIENT_ID, CLIENT_SECRET, DOMAIN } = event.secrets

	try {
		const management = new ManagementClient({
			domain: DOMAIN,
			clientId: CLIENT_ID,
			clientSecret: CLIENT_SECRET,
			scope: 'read:users create:organization_members read:organizations update:users',
		});

		const { data: users } = await management.users.getAll({
			q: `email:"${event.user.email}"`,
			search_engine: "v3"
		})

		const userOrganizations = await management.organizations.getMembers({ id: event.organization.id })

		const filteredUsers = users.filter((user) =>
			userOrganizations.data.find((orgUser) => orgUser.user_id === user.user_id),
		)

		let mainUser, secondaryUser, currentUser
		for (const user of filteredUsers){
			const userIdetities = user.identities.map(identity => identity.connection)

			if (userIdetities.includes('Username-Password-Authentication')) mainUser = user
			else secondaryUser = user

			if (user.user_id === event.user.user_id) currentUser = user
		}

		if (!mainUser) {
			api.access.deny("No authorized user found")
			return
		}
		if (!currentUser) {
			api.access.deny('Retry')
			return
		}
		if (!secondaryUser) return

		await management.users.link(
			{
				id: mainUser.user_id,
			},
			{
				user_id: secondaryUser.user_id,
				provider: secondaryUser.identities[0].provider,
			},
		)

		await api.authentication.setPrimaryUser(mainUser.user_id)
	} catch (err) {
		api.access.deny("Login flow error 500 " + JSON.stringify(err))
	}
}
```
	</TabItem>
	<TabItem value="roleByDefault" label="roleByDefault" default>
```js
exports.onExecutePostLogin = async (event, api) => {
  const namespace = "userRoles";
  const ManagementClient = require('auth0').ManagementClient;
  const management = new ManagementClient({
    domain: event.secrets.domain,
    clientId: event.secrets.clientId,
    clientSecret: event.secrets.clientSecret,
    scope: "read:roles update:roles create:role_members read:organization_members read:organizations"
  });

  if (!event.organization?.id) api.access.deny("No authorized user found")

  const roles = await management.organizations.getMemberRoles({
    id: event.organization?.id,
    user_id: event.user.user_id
  })

  if (event.authorization && roles.length === 0) {
    try {
      await management.organizations.addMemberRoles(
        { id: event.organization?.id, user_id: event.user.user_id },
        { roles: [event.secrets.defaultRoleId] },
      )

      const newRoles = await management.organizations.getMemberRoles({
        id: event.organization?.id,
        user_id: event.user.user_id
      })

      api.idToken.setCustomClaim(`${namespace}`, newRoles);
      api.accessToken.setCustomClaim(`${namespace}`, newRoles);

    } catch (e) {
      console.error(e);
    }
  } else if (event.authorization) {
    try {
      api.idToken.setCustomClaim(`${namespace}`, roles);
      api.accessToken.setCustomClaim(`${namespace}`, roles);
    } catch (e) {
      console.error(e);
    }
  }
};
```
	</TabItem>
	<TabItem value="unaurhorize" label="Unauthorize user/pass on SSO" default>
```js
exports.onExecutePostLogin = async (event, api) => {
  if (!event.user.app_metadata.SSO) return
  if (event.connection.name !== "Username-Password-Authentication") return

  api.access.deny("Unsecure login detected, please login using SSO")
};
```
	</TabItem>
	<TabItem value="add-metadata" label="Add Metadata" default>
```js
exports.onExecutePostLogin = async (event, api) => {
    for (const metadata of Object.keys(event.user.app_metadata)){
        api.accessToken.setCustomClaim(metadata, event.user.app_metadata[metadata])
        api.idToken.setCustomClaim(metadata, event.user.app_metadata[metadata])
    }
};
```
	</TabItem>
</Tabs>


## [Mau](https://www.mau.nestjs.com/)

Mau is a deployment tool that allows to deploy the application with a single command. It uses `Docker` to build the images and `ECS` to deploy the application. It also provides a way to manage the environment variables and the deployment configuration.