CREATE ROLE web_anon NOLOGIN;

CREATE SCHEMA IF NOT EXISTS self_hosted_wishlist;

CREATE TABLE self_hosted_wishlist.items (
				id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
				name TEXT NOT NULL,
				website TEXT NOT NULL,
				price TEXT NOT NULL,
				url TEXT NOT NULL,
				image_url TEXT NOT NULL
			);

GRANT USAGE ON SCHEMA self_hosted_wishlist TO web_anon;
GRANT ALL ON TABLE self_hosted_wishlist.items TO web_anon;