import {Schema, model, Document, Types} from 'mongoose';
export interface IBook extends Document{
    userId: Types.ObjectId;
    title:string,
    author: string;
    year?:number;
}
const bookSchema = new Schema<IBook>({
    userId: {type: Schema.Types.ObjectId, ref:'User', required:true},
    title:{type:String, required: true, trim:true},
    author:{type:String, required:true, trim:true},
    year:{type:Number}
},{
    timestamps:true,  versionKey:false
})

export default model <IBook>('Book', bookSchema);