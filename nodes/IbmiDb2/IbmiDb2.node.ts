import {
	IDataObject,
	IExecuteFunctions,
	ICredentialTestFunctions,
	ICredentialsDecrypted,
	INodeCredentialTestResult,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
	ICredentialDataDecryptedObject,
} from 'n8n-workflow';

import {
	getConnectionPool,
	searchTables,
	testConnection
} from "./GenericFunctions";

export class IbmiDb2 implements INodeType {

	description: INodeTypeDescription = {
		displayName: 'IBMi DB2',
		name: 'ibmiDb2',
		icon: 'file:IbmiDb2.svg',
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
				name: 'ibmiDb2JdbcApi',
				required: true,
				// testedBy: 'dbConnectionTest',
			},
		],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Execute Query',
						value: 'executeQuery',
						description: 'Execute a SQL query',
						action: 'Execute a SQL query',
					},
					{
						name: 'Insert',
						value: 'insert',
						description: 'Insert rows in database',
						action: 'Insert rows in database',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update rows in database',
						action: 'Update rows in database',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete rows in database',
						action: 'Delete rows in database',
					},
				],
				default: 'executeQuery',
			},

			// ----------------------------------
			//         executeQuery
			// ----------------------------------
			{
				displayName: 'Query',
				name: 'query',
				type: 'string',
				noDataExpression: true,
				typeOptions: {
					editor: 'sqlEditor',
					rows: 5,
					sqlDialect: 'StandardSQL',
				},
				displayOptions: {
					show: {
						operation: ['executeQuery'],
					},
				},
				default: '',
				placeholder: 'SELECT * FROM SCHEMA.TABLE LIMIT 10',
				required: true,
				description: 'The SQL query to execute',
			},

			// ----------------------------------
			//         insert
			// ----------------------------------
			{
				displayName: 'Table',
				name: 'table',
				type: 'resourceLocator',
				default: { mode: 'list', value: '' },
				required: true,
				modes: [
					{
						displayName: 'From List',
						name: 'list',
						type: 'list',
						placeholder: 'Select a Table...',
						typeOptions: {
							searchListMethod: 'searchTables',
							searchFilterRequired: false,
							searchable: true,
						},
					},
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						placeholder: 'table_name',
					},
				],
				displayOptions: {
					show: {
						operation: ['insert'],
					},
				},
				description: 'Name of the table in which to insert data to',
			},
			{
				displayName: 'Columns',
				name: 'columns',
				type: 'string',
				displayOptions: {
					show: {
						operation: ['insert'],
					},
				},
				requiresDataPath: 'multiple',
				default: '',
				placeholder: 'id,name,description',
				description:
					'Comma-separated list of the properties which should used as columns for the new rows',
			},

			// ----------------------------------
			//         update
			// ----------------------------------
			{
				displayName: 'Table',
				name: 'table',
				type: 'resourceLocator',
				default: { mode: 'list', value: '' },
				required: true,
				modes: [
					{
						displayName: 'From List',
						name: 'list',
						type: 'list',
						placeholder: 'Select a Table...',
						typeOptions: {
							searchListMethod: 'searchTables',
							searchFilterRequired: false,
							searchable: true,
						},
					},
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						placeholder: 'table_name',
					},
				],
				displayOptions: {
					show: {
						operation: ['update'],
					},
				},
				description: 'Name of the table in which to delete data',
			},
			{
				displayName: 'Update Key',
				name: 'updateKey',
				type: 'string',
				requiresDataPath: 'single',
				displayOptions: {
					show: {
						operation: ['update'],
					},
				},
				default: 'id',
				required: true,
				// eslint-disable-next-line n8n-nodes-base/node-param-description-miscased-id
				description:
					'Name of the property which decides which rows in the database should be updated. Normally that would be "id".',
			},
			{
				displayName: 'Columns',
				name: 'columns',
				type: 'string',
				requiresDataPath: 'multiple',
				displayOptions: {
					show: {
						operation: ['update'],
					},
				},
				default: '',
				placeholder: 'name,description',
				description:
					'Comma-separated list of the properties which should used as columns for rows to update',
			},

			// ----------------------------------
			//         delete
			// ----------------------------------
			{
				displayName: 'Table',
				name: 'table',
				type: 'resourceLocator',
				default: { mode: 'list', value: '' },
				required: true,
				modes: [
					{
						displayName: 'From List',
						name: 'list',
						type: 'list',
						placeholder: 'Select a Table...',
						typeOptions: {
							searchListMethod: 'searchTables',
							searchFilterRequired: false,
							searchable: true,
						},
					},
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						placeholder: 'table_name',
					},
				],
				displayOptions: {
					show: {
						operation: ['delete'],
					},
				},
				description: 'Name of the table in which to delete data',
			},
			{
				displayName: 'Delete Key',
				name: 'deleteKey',
				type: 'string',
				requiresDataPath: 'single',
				displayOptions: {
					show: {
						operation: ['delete'],
					},
				},
				default: 'id',
				required: true,
				// eslint-disable-next-line n8n-nodes-base/node-param-description-miscased-id
				description:
					'Name of the property which decides which rows in the database should be deleted. Normally that would be "id".',
			},
		],
	};

	methods = {
		// TODO: Find out why this doesn't work
		credentialTest: {
			async dbConnectionTest(
				this: ICredentialTestFunctions,
				credential: ICredentialsDecrypted,
			): Promise<INodeCredentialTestResult> {
				const credentials = credential.data as ICredentialDataDecryptedObject;
				try {
					testConnection(credentials)
				} catch (error) {
					return {
						status: 'Error',
						message: error.message,
					};
				}
				return {
					status: 'OK',
					message: 'Connection successful!',
				};
			},
		},
		listSearch: {
			searchTables,
		},
	};



	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const credentials = await this.getCredentials('ibmiDb2JdbcApi');

		if (credentials === undefined) {
			throw new NodeOperationError(this.getNode(), 'No credentials found for this node.');
		}

		const pool = getConnectionPool(credentials);

		let returnItems: INodeExecutionData[] = [];

		const items = this.getInputData();
		const operation = this.getNodeParameter('operation', 0) as string;


		try {
			if (operation === 'executeQuery') {
				const queryString = this.getNodeParameter('query', 0) as string;
				const queryResult = await pool.query(queryString);
				returnItems = this.helpers.returnJsonArray(queryResult as IDataObject[]);
			}

			// ----------------------------------
			//         insert
			// ----------------------------------
			else if (operation === 'insert') {

				const table = this.getNodeParameter('table', 0, '', { extractValue: true }) as string;
				const columnString = this.getNodeParameter('columns', 0) as string;
				const columns = columnString.split(',').map((column) => column.trim());
				const insertItems = this.helpers.copyInputItems(items, columns);
				const insertSQL = `INSERT INTO ${table} (${columnString}) VALUES (${columns.map((_column) => '?').join(',')})`;

				const insertData = insertItems.reduce(
					(collection: IDataObject[], item) =>
						collection.concat([Object.values(item)] as any[]),
					[],
				);

				const affectedRows = await pool.batchUpdate(insertSQL, insertData as any[]);
				returnItems = this.helpers.returnJsonArray({ affectedRows: affectedRows.reduce((a, c) => a + c) });
			}

			// ----------------------------------
			//         update
			// ----------------------------------
			else if (operation === 'update') {
				const table = this.getNodeParameter('table', 0, '', { extractValue: true }) as string;
				const updateKey = this.getNodeParameter('updateKey', 0) as string;
				const columns = (this.getNodeParameter('columns', 0) as string).split(',')
					.map((column) => column.trim());
				const updateItems = this.helpers.copyInputItems(this.getInputData(), columns.concat(updateKey));
				const updateSQL = `UPDATE ${table} SET ${columns.map((c) => `${c}=?`).join(',')} WHERE ${updateKey}=?`;

				const updateData = updateItems.reduce(
					(collection: IDataObject[], item) =>
						collection.concat([Object.values(item)] as any[]),
					[],
				);

				const affectedRows = await pool.batchUpdate(updateSQL, updateData as any[]);
				returnItems = this.helpers.returnJsonArray({ affectedRows: affectedRows.reduce((a, c) => a + c) });
			}

			// ----------------------------------
			//         delete
			// ----------------------------------
			else if (operation === 'delete') {

				const table = this.getNodeParameter('table', 0, '', { extractValue: true }) as string;
				const deleteKey = this.getNodeParameter('deleteKey', 0) as string;
				const deleteItems = this.helpers.copyInputItems(this.getInputData(), [deleteKey]);

				const deleteData = deleteItems.reduce(
					(collection: IDataObject[], item) =>
						collection.concat([Object.values(item)] as any[]),
					[],
				);

				const deleteSQL = `DELETE FROM ${table} WHERE ${deleteKey}=?`;

				const affectedRows = await pool.batchUpdate(deleteSQL, deleteData as any[]);
				returnItems = this.helpers.returnJsonArray({ affectedRows: affectedRows.reduce((a, c) => a + c) });
			}
			else {
				// TODO: Clean up this shortcut... :/
				pool.close();
				throw new NodeOperationError(
					this.getNode(),
					`The operation "${operation}" is not supported!`,
				);
			}


		}
		catch (error) {
			if (this.continueOnFail()) {
				returnItems = items;
			}
			else {
				pool.close();
				throw new NodeOperationError(this.getNode(), error);
			}
		}

		pool.close();

		return this.prepareOutputData(returnItems);

	}
}
