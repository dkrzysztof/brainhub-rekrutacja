module.exports = {
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: process.env.POSTGRES_USERNAME,
	password: process.env.POSTGRES_PASSWORD,
	database: process.env.POSTGRES_DATABASE,
	synchronize: true,
	logging: false,
	entities: ['dist/**/*.entity.js'],
	migrationsTableName: 'migration',
	migrations: ['dist/migration/*.js'],
	cli: {
		migrationsDir: './src/migration',
	},
	ssl: false,
};
