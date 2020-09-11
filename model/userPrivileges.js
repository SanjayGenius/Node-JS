module.exports = (sequelize, type) => {
    return sequelize.define('user_privileges', {
        privilege_id : {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: type.INTEGER,
        feature_ids : type.STRING,
        active_status : type.INTEGER,
        created_date : type.DATE,
        created_by : type.INTEGER,
        modified_date : type.DATE,
        modified_by : type.INTEGER,
        end_date : type.DATE
    },{
        timestamps: false
    })
    
};