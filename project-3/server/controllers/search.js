router.get('/search', async (req, res) => {
    try {
        const { query, page = 1, limit = 10, category, minPrice, maxPrice, minRating } = req.query;
        const skip = (page - 1) * limit;

        let productFilters = {
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
                { author: { $regex: query, $options: 'i' } }
            ]
        };

        if (category) {
            const categories = await Category.find({ name: { $regex: category, $options: 'i' } });
            if (categories.length > 0) {
                const categoryIds = categories.map(cat => cat._id);
                productFilters.category = { $in: categoryIds };
            }
        }

        if (minPrice || maxPrice) {
            productFilters.price = {};
            if (minPrice) productFilters.price.$gte = Number(minPrice);
            if (maxPrice) productFilters.price.$lte = Number(maxPrice);
        }

        if (minRating) {
            productFilters.rating = { $gte: Number(minRating) };
        }

        const products = await Product.find(productFilters).skip(skip).limit(Number(limit));
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
