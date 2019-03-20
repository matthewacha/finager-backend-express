/*jshint esversion: 6 */
/* jshint node: true */
'use strict';
module.exports = (sequelize, DataTypes) => {
    const Account = sequelize.define('Account', {
        balance: DataTypes.STRING,
        preset_bills: DataTypes.BOOLEAN
    }, {});
    Account.associate = (models) => {
        // associations can be defined here
        Account.hasMany(models.Transaction, {
            foreignKey: 'accountId',
            as: 'transactions',
        });

        Account.belongsTo(models.User, {
            foreignKey: 'userId',
            onDelete: 'CASCADE',
        });
    };
    return Account;
};