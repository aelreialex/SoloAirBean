import * as apiKeysService from "../services/api_keys.service.js";

export const getApiKeys = async (req, res, next) => {
    const result = await apiKeysService.getApiKeys();

    if (!result.success) {
        return next({
            status: 500,
            message: `Database failed to retrieve the keys, error: ${result.message}`,
        });
    }

    if (result.keys.length === 0) {
        return res.json({
            success: true,
            message: "Api keys successfully retrieved but is empty",
            key: result.keys,
        });
    }

    res.json({
        success: true,
        message: "Api keys successfully retrieved",
        key: result.keys[Math.floor(Math.random() * result.keys.length)],
    });
};
