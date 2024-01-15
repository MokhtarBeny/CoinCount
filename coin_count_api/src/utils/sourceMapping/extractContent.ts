function extractContent(htmlString) {
    const imageUrlMatch = htmlString.match(/<img[^>]+src="([^">]+)"/);
    const imageUrl = imageUrlMatch ? imageUrlMatch[1] : null;
    const text = htmlString.replace(/<[^>]*>?/gm, '').trim();

    return { imageUrl, text };
}


export default extractContent;