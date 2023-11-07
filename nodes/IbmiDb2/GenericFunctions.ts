import * as jt400 from "node-jt400";
import {IDataObject, ILoadOptionsFunctions, INodeListSearchResult} from "n8n-workflow";

export function getConfig(credentials: IDataObject) {
	return {
		host: credentials.host as string,
		user: credentials.user as string,
		password: credentials.password as string,
		port: credentials.port as number,
		database: credentials.database as string,
		libraries: credentials.libraries as string,
		prompt: 'false' as string, // Daemon
		'translate binary': 'true' as string
	};
}

export function testConnection(credentials: IDataObject) {
	const config = getConfig(credentials)
	return jt400.connect(config)
}

export function getConnectionPool(credentials: IDataObject) {
	const config = getConfig(credentials)
	return jt400.pool(config)
}

export async function searchTables(this: ILoadOptionsFunctions, query?: string,): Promise<INodeListSearchResult> {
	const credentials = await this.getCredentials('ibmiDb2JdbcApi');
	const pool = getConnectionPool(credentials);
	const sql = `
		SELECT TABLE_NAME
		FROM SYSIBM.TABLES
		WHERE TABLE_SCHEMA = '${credentials.database}'
		  AND TABLE_NAME LIKE '${query || ''}%'
		AND TABLE_TYPE = 'BASE TABLE'
		ORDER BY TABLE_NAME
	`;
	const rows = await pool.query(sql);

	const results = (rows as IDataObject[]).map((r) => ({
		name: r.TABLE_NAME as string,
		value: r.TABLE_NAME as string,
	}));

	pool.close();

	return { results };
}
