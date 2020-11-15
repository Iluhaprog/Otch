USE OtchDB;

DELIMITER $$
DROP FUNCTION IF EXISTS insertMessage$$
CREATE FUNCTION insertMessage(user_id INT, chat_id INT, message_text TEXT, creation_date DATETIME)
RETURNS INT
DETERMINISTIC
READS SQL DATA
BEGIN
    DECLARE last_id INT;

    INSERT INTO Messages(user_id, chat_id, message, creation_date) 
        VALUES (user_id, chat_id, message_text, creation_date);
    SELECT LAST_INSERT_ID() INTO last_id;
    RETURN last_id;
END$$
DELIMITER ;