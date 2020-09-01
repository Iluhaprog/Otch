const query = require('../libs/connection');
const Answer = require('../libs/Answer');
const { formatDate } = require('../libs/format');
const { SUCCESS, FAILURE, RECORD_NF } = require('../libs/statuses');

class NotificationsService {

    /**
     * Get notification by id
     * 
     * @param {number} id 
     * @returns {Answer} If notification exist, then Answer contains status SUCCESS and data is notification, 
     *                   otherwise status RECORD_NF
     */
    async getById(id) {
        const [[notification]] = await query('SELECT * FROM Notifications WHERE `id`=?;', [id]);
        return notification ? new Answer(SUCCESS, notification) : new Answer(RECORD_NF);
    }

    /**
     * Get all notifications of user by his id
     * 
     * @param {number} userId 
     * @returns {Answer} If notifications exist, then Answer contains status SUCCESS and data is notifications,
     *                   otherwise status RECORD_NF
     */
    async getByUserId(userId) {
        const [notifications] = await query('SELECT * FROM Notifications WHERE `user_id`=?;', [userId]);
        return notifications.length ? new Answer(SUCCESS, notifications) : new Answer(RECORD_NF);
    }

    /**
     * Create notification
     * 
     * @param {Object} notification 
     * @param {string} notification.message
     * @param {number} notification.viewed 0 or 1
     * @param {Date} notification.creationDate
     * @param {number} notification.userId
     * @returns {Answer} If notification created, then Answer contains status SUCCESS, otherwise status FAILURE
     */
    async create(notification) {
        if (notification) {
            const creationDate = notification.creationDate || new Date();
            await query('INSERT INTO Notifications(`message`, `viewed`, `creation_date`, `user_id`) VALUE (?, ?, ?, ?);',
                        [
                            notification.message, 
                            notification.viewed, 
                            formatDate(creationDate), 
                            notification.userId
                        ]); 
            return new Answer(SUCCESS);
        }
        return new Answer(FAILURE);
    }

    /**
     * Update the field `viewed` of notification 
     * 
     * @param {Object} notification
     * @param {number} notification.id 
     * @param {number} notification.viewed
     * @returns {Answer} If notification updated, then Answer contains status SUCCESS, otherwise status FAILURE
     */
    async update(notification) {
        const answer = await this.getById(notification.id);
        if (answer.getStatus()) {
            await query('UPDATE Notifications SET `viewed`=? WHERE `id`=?;', [notification.viewed, notification.id]);
            return new Answer(SUCCESS);
        }
        return new Answer(FAILURE);
    }

    /**
     * Delete notification by id
     * 
     * @param {number} id 
     * @returns {Answer} If notification deleted, then Answer contains status SUCCESS, otherwise status FAILURE
     */
    async deleteById(id) {
        const answer = await this.getById(id);
        if (answer.getStatus()) {
            await query('DELETE FROM Notifications WHERE `id`=?', [id]);
            return new Answer(SUCCESS);
        }
        return new Answer(FAILURE);
    }
}

module.exports = new NotificationsService();