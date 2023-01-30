import Post from './post.model';
import Sequelize, { BelongsToManyGetAssociationsMixin, CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

class Hashtag extends Model<InferAttributes<Hashtag>, InferCreationAttributes<Hashtag>> {

    declare id: CreationOptional<number>;
    declare title: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    declare getPosts: BelongsToManyGetAssociationsMixin<Post>

    static initiate(sequelize: Sequelize.Sequelize) {
        Hashtag.init({
            id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
            title: { type: Sequelize.STRING(15), unique: true },
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Hashtag',
            tableName: 'hashtags',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        });
    }

    static associate() {
        Hashtag.belongsToMany(Post, { through: 'PostHashtag' })
    }
}

export default Hashtag;