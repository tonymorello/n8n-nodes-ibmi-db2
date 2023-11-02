// import {
// 	IExecuteFunctions,
// } from 'n8n-core';

import {
	IDataObject, IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';

import * as jt400 from 'node-jt400';

export class IBMiDb2 implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'IBMi DB2',
		name: 'IBMiDb2',
		icon: 'file:IBMiDb2.svg',
		group: ['transform'],
		version: 1,
		description: 'Connect to IBM iSeries DB2 Instance',
		defaults: {
			name: 'IBMi DB2',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'IBMiDb2JDBC',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Query',
				name: 'query',
				type: 'string',
				typeOptions: {
					rows: 5, // rows [type: string]: Number of rows the input field should have. By default it is "1"
				},
				displayOptions: {
					show: {
						operation: ['executeQuery'],
					},
				},
				default: '',
				placeholder: 'SELECT * FROM SCHEMA.TABLE LIMIT 10',
				required: true,
				description: 'The SQL query to execute.',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				options: [
					{
						name: 'Execute Query',
						value: 'executeQuery',
						description: 'Execute a DB2 SQL query for IBM i',
					},
				],
				default: 'executeQuery',
				description: 'The operation to perform.',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const credentials = await this.getCredentials('IBMiDb2JDBC');

		if (credentials === undefined) {
			throw new NodeOperationError(this.getNode(), 'No credentials found for this node.');
		}

		const config = {
			host: credentials.host as string,
			user: credentials.user as string,
			password: credentials.password as string,
			port: credentials.port as number,
			database: credentials.database as string,
			libraries: credentials.libraries as string,
			prompt: 'false' as string, // Daemon
			'translate binary': 'true' as string
		};

		const pool = jt400.pool(config);

		let results: any[] = [];

		const items = this.getInputData();
		const operation = this.getNodeParameter('operation', 0) as string;


		try {
			if (operation === 'executeQuery') {
				const queryString = this.getNodeParameter('query', 0) as string;
				const queryResult = await pool.query(queryString);
				results = this.helpers.returnJsonArray(queryResult as IDataObject[]);
			}
			else {
				// TODO: Add operations

			}


		}
		catch (error) {
			if (this.continueOnFail()) {
				results = items;
			}
			else {
				pool.close();
				throw new NodeOperationError(this.getNode(), error);
			}
		}

		pool.close();

		return this.prepareOutputData(results);

	}
}
