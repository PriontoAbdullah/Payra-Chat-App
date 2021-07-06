function decorateHtmlResponse(page_title) {
	return (req, res, next) => {
		res.locals.html = true;
		res.locals.title = `${page_title} - ${process.env.APP_NAME}`;
		next();
	};
}

module.exports = decorateHtmlResponse;
