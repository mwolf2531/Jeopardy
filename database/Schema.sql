DROP TABLE IF EXISTS jeopardy_data, high_scores;

-- psql -d jeopardy -f database/Schema.sql

-- Jeopardy Data --


CREATE TABLE IF NOT EXISTS jeopardy_data (
  show_number INTEGER,
  air_date DATE,
  round VARCHAR(20),
  category VARCHAR(100),
  value VARCHAR(10),
  question VARCHAR,
  answer VARCHAR
);

CREATE TABLE IF NOT EXISTS high_scores (
  name VARCHAR,
  score INTEGER
);

COPY jeopardy_data FROM '/Users/meganwolf/HackReactor/hr-bge0-mvp/csv/JEOPARDY_CSV.csv' DELIMITER ',' CSV HEADER;

