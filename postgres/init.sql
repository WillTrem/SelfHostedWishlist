CREATE SCHEMA IF NOT EXISTS self_hosted_wishlist;

CREATE TABLE self_hosted_wishlist.items (
				id INTEGER PRIMARY KEY,
				name TEXT NOT NULL,
				website TEXT NOT NULL,
				price TEXT NOT NULL,
				url TEXT NOT NULL,
				image_url TEXT NOT NULL
			);