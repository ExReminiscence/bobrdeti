var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
	Posts
	=====
 */

var PostComment = new keystone.List('PostComment', {
	label: 'Коментарии',
	hidden: true
});

PostComment.add({
	post: {label: 'Комментарий поста(оценка)', type: Types.Relationship, initial: true, ref: 'Post', index: true },
	commentState: {label: 'Публикация', type: Types.Select, options: ['Опубликовано', 'Архив'], default: 'Опубликовано', index: true },
	publishedOn: {label: 'Дата', type: Types.Date, default: Date.now, noedit: true, index: true },
	assessment: { label: 'Оценка', type: Types.Text }
});



PostComment.schema.pre('save', function (next) {
	this.wasNew = this.isNew;
	if (!this.isModified('publishedOn') && this.isModified('commentState') && this.commentState === 'published') {
		this.publishedOn = new Date();
	}
	next();
});



PostComment.defaultSort = '-publishedOn';
PostComment.defaultColumns = 'author, post, publishedOn, commentState';
PostComment.register();
