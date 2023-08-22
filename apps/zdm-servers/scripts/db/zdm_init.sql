CREATE TABLE IF NOT EXISTS "user" (
    id text NOT NULL,
    "name"    varchar(16) NOT NULL unique,
    password text NOT NULL,
    email text,
    createdAt timestamp NOT NULL,
    updatedAt timestamp NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS entity (
    id        text NOT NULL,
    "name"		varchar(40) NOT NULL,
    order integer NOT NULL,
  	description text,
  	parent_id	text,
  	createdAt timestamp NOT NULL,
  	updatedAt timestamp NOT NULL,
  	user_id text NOT NULL,
  	PRIMARY KEY(id),
  	CONSTRAINT fk_parent_id FOREIGN KEY(parent_id) REFERENCES entity(id) ON DELETE CASCADE,
    CONSTRAINT fk_attribute_value_user FOREIGN KEY(user_id) REFERENCES "user"(id)
);

CREATE TABLE IF NOT EXISTS entity_object (
    id text NOT NULL,
  	image_link text,
  	"name" varchar(40) NOT NULL,
  	description text,
    entity_id text NOT NULL,
  	user_id text NOT NULL,
  	createdAt timestamp NOT NULL,
  	updatedAt timestamp NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT fk_entity_object_entity FOREIGN KEY(entity_id) REFERENCES entity(id) ON DELETE CASCADE,
    CONSTRAINT fk_attribute_value_user FOREIGN KEY(user_id) REFERENCES "user"(id)
);

CREATE TABLE IF NOT EXISTS attribute_type (
    id  text NOT NULL,
    "name"    varchar(40) NOT NULL,
  	user_id text NOT NULL,
  	createdAt timestamp NOT NULL,
  	updatedAt timestamp NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT fk_attribute_value_user FOREIGN KEY(user_id) REFERENCES "user"(id)
);

CREATE TABLE IF NOT EXISTS "attribute" (
    id text NOT NULL,
    "name"    varchar(40) NOT NULL,
    type_id text,
    entity_id text,
    "order" integer,
  	user_id text NOT NULL,
  	createdAt timestamp NOT NULL,
  	updatedAt timestamp NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT fk_attribute_attribute_type FOREIGN KEY(type_id) REFERENCES attribute_type(id),
    CONSTRAINT fk_attribute_entity FOREIGN KEY(entity_id) REFERENCES entity(id) ON DELETE CASCADE,
    CONSTRAINT fk_attribute_value_user FOREIGN KEY(user_id) REFERENCES "user"(id)
);

CREATE TABLE IF NOT EXISTS attribute_value (
    id text NOT NULL,
    value text,
    attribute_id text,
    entity_id text,
  	user_id text NOT NULL,
  	createdAt timestamp NOT NULL,
  	updatedAt timestamp NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT fk_attribute_value_attribute FOREIGN KEY(attribute_id) REFERENCES attribute(id) ON DELETE CASCADE,
    CONSTRAINT fk_attribute_value_entity FOREIGN KEY(entity_id) REFERENCES entity(id) ON DELETE CASCADE,
    CONSTRAINT fk_attribute_value_user FOREIGN KEY(user_id) REFERENCES "user"(id)
);
