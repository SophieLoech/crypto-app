CREATE TABLE IF NOT EXISTS symbols (
    symbol_id INT AUTO_INCREMENT PRIMARY KEY,
    symbol VARCHAR(10) NOT NULL,
    coin_code VARCHAR(10) NOT NULL,
    crypto_code VARCHAR(10) NOT NULL,
    created_at TIMESTAMP
)  ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS bids (
    symbol INT NOT NULL,
    bid_px VARCHAR(10) NOT NULL,
    bid_qty VARCHAR(10) NOT NULL,
    bid_num VARCHAR(10) NOT NULL,
    created_at TIMESTAMP,
    CONSTRAINT FK_BIDSsymbol FOREIGN KEY (symbol)
    REFERENCES symbols(symbol_id)
)  ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS asks (
    symbol INT NOT NULL,
    asks_px VARCHAR(10) NOT NULL,
    asks_qty VARCHAR(10) NOT NULL,
    asks_num VARCHAR(10) NOT NULL,
    created_at TIMESTAMP,
    CONSTRAINT FK_ASKSsymbol FOREIGN KEY (symbol)
    REFERENCES symbols(symbol_id)
)  ENGINE=INNODB;