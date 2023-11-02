import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class IbmiDb2JdbcApi implements ICredentialType {
	name = 'iBMiDb2JDBCApi';
	displayName = 'IBM I Db2 API';
	documentationUrl = 'https://www.ibm.com/docs/en/i/7.5?topic=ssw_ibm_i_75/rzahh/javadoc/com/ibm/as400/access/doc-files/JDBCProperties.htm';
	properties: INodeProperties[] = [
		{
			displayName: 'Host',
			name: 'host',
			type: 'string',
			required: true,
			default: 'localhost',
			description: 'Specify the TCP/IP host name/address of the database server',
		},
		{
			displayName: 'User',
			name: 'user',
			type: 'string',
			required: true,
			default: '',
			placeholder: 'Username',
			description: 'Specifies the user name for connecting to the database',
		},
		{
			displayName: 'Password',
			name: 'password',
			type: 'string',
			typeOptions: {
				password: true,
			},
			required: true,
			default: '',
			placeholder: 'Password',
			description: 'Specifies the password for connecting to the database',
		},
		{
			displayName: 'Database',
			name: 'database',
			type: 'string',
			default: '',
			description: 'Specifies the default database',
		},
		{
			displayName: 'Libraries',
			name: 'libraries',
			type: 'string',
			default: '*LIBL',
			description: 'Specifies one or more libraries that you want to add/replace in the library list',
		},
		{
			displayName: 'Port',
			name: 'port',
			type: 'number',
			default: 446,
		},
	];
}
