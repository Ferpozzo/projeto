import mongoose, { mongo } from '../database/database';

const ObjectSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['bar', 'horizontalBar', 'line', 'pie', 'doughnut'],
        default: 'bar'
    },
    backgroundColor: {
        type: [String],
        required: true,
        default: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)']
    },
    borderColor: {
        type: [String],
        required: true,
        default: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)']
    },
    borderWidth: {
        type: Number,
        required: true,
        default: 1
    }
}, { timestamps: true });

export const Object = mongoose.model('Object', ObjectSchema)