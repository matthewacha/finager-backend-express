/*jshint esversion: 6 */
/* jshint node: true */
'use strict';
module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define('Transaction', {
        content: DataTypes.STRING,
        complete: DataTypes.BOOLEAN
    }, {});
    Transaction.associate = function(models) {
        // associations can be defined here
        Transaction.hasMany(models.Account, {
            foreignKey: 'accountId',
            as: 'accounts'
        });
    };

    return Transaction;
};