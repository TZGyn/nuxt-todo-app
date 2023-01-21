export interface Database {
	public: {
		Tables: {
			notes: {
				Row: {
					id: number;
					title: string;
					description: string;
					user_id: string;
					created_at: string;
				}; // The data expected to be returned from a "select" statement.
				Insert: {}; // The data expected passed to an "insert" statement.
				Update: {
					description: string;
				}; // The data expected passed to an "update" statement.
			};
		};
	};
}
