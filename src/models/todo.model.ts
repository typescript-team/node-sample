import Sequelize, { InferAttributes, InferCreationAttributes, Model } from 'sequelize';

class Todo extends Model<InferAttributes<Todo>, InferCreationAttributes<Todo>> {
    declare bunho: string;
    declare title: string;
    declare completed: boolean;

    static initiate(sequelize: Sequelize.Sequelize) {
        Todo.init({
            bunho: { type: Sequelize.UUID, primaryKey: true, allowNull: false },
            title: { type: Sequelize.STRING, allowNull: false },
            completed: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false }
        }, {
            sequelize,
            modelName: 'Todo',
            tableName: 'todos',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        });
    }

    static associate() { }
}

export default Todo;