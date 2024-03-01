import Comment from './comment.model.js'
import { checkUpdate } from '../utils/validator.js'

export const add = async (req, res) => {
    try {
        let data = req.body
        let comment = new Comment(data)
        await comment.save()

        return res.send({ message: 'Add comment successfully' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error add comment', err: err })
    }
}

export const update = async (req, res) => {
    try {

        let { id } = req.params
        let data = req.body
        let uid = req.user._id
        let update = checkUpdate(data, id)
        let comment = await Comment.findOne({ _id: id, user: uid });
        if (!update) return res.status(400).send({ message: 'Have submitted some data that cannot be updated or missing data' })
        let updateComment = await Comment.findOneAndUpdate(
            { _id: id },
            data,

            { new: true }
        )
        if (!updateComment) return res.status(401).send({ message: 'Comment not found and not updated' })
        return res.send({ message: 'Updated commet', updateComment })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error updating comment', err: err })
    }
}

export const deleteC = async (req, res) => {
    try {
        let { id } = req.params;
        let uid = req.user._id
        //let
        let comment = await Comment.findOne({ _id: id, user: uid });
        let updatedComment = await Comment.findOneAndDelete({ _id: id, user: uid });
        if (!updatedComment)
            return res.status(500).send({ message: 'Error deleting ' });

        return res.send({ message: 'Comment deleted ' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error deleting ', err: err });
    }
}