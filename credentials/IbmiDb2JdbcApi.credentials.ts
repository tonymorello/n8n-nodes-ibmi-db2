import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class IbmiDb2JdbcApi implements ICredentialType {
	name = 'ibmiDb2JdbcApi';
	displayName = 'IBM I Db2 API';
	documentationUrl = 'https://www.ibm.com/docs/en/i/7.5?topic=ssw_ibm_i_75/rzahh/javadoc/com/ibm/as400/access/doc-files/JDBCProperties.htm';
	properties: INodeProperties[] = [
		{
			displayName: 'Host',
			name: 'host',
			type: 'string',
			required: true,
			default: 'localhost',
			description: 'Specify the TCP/IP host name/address of the database server.',
		},
		{
			displayName: 'User',
			name: 'user',
			type: 'string',
			required: true,
			default: '',
			placeholder: 'Username',
			description: 'Specifies the user name for connecting to the database.',
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
			description: 'Specifies the password for connecting to the database.',
		},
		{
			displayName: 'Database',
			name: 'database',
			type: 'string',
			default: '',
			description: 'Specifies the default database.',
		},
		{
			displayName: 'Libraries',
			name: 'libraries',
			type: 'string',
			default: '*LIBL',
			description: 'Specifies one or more libraries that you want to add/replace in the library list. (Default: *LIBL)',
		},
		{
			displayName: 'Port',
			name: 'port',
			type: 'number',
			default: 446,
			description: 'Specifies the connection port for the host. (Default: 446)',
		},
		{
			displayName: 'Translate Binary',
			name: 'translate_binary',
			type: 'boolean',
			default: false,
			description: 'Specifies whether binary data is translated. If this property is set to "true", then BINARY and VARBINARY fields are treated as CHAR and VARCHAR fields. (Default: FALSE)',
		},
		{
			displayName: 'Translate Boolean',
			name: 'translate_boolean',
			type: 'boolean',
			default: true,
			description: 'Specifies how Boolean objects are interpreted when setting the value for a character field/parameter using the PreparedStatement.setObject(), CallableStatement.setObject() or ResultSet.updateObject() methods. Setting the property to "true", would store the Boolean object in the character field as either "true" or "false". Setting the property to "false", would store the Boolean object in the character field as either "1" or "0". (Default: TRUE)',
		},
	];
}
