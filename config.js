const env = process.env

export const nodeEnv = env.NODE_ENV || 'development';

export default {
	port: env.PORT || 8080,
	host: env.HOST || '188.225.25.82',
	 get serverUrl() {
    	return `http://${this.host}:${this.port}`;
  	}
};

// server
// 188.225.25.82
// local
// 0.0.0.0