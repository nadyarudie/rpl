exports.validateTransactionData = (data) => {
    const errors = {};
    let valid = true;

    if (!data.title || data.title.trim() === '') {
        errors.title = 'Title is required';
        valid = false;
    }

    if (!data.date) {
        errors.date = 'Date is required';
        valid = false;
    } else {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date)) {
            errors.date = 'Date must be in YYYY-MM-DD format';
            valid = false;
        }
    }

    if (data.amount === undefined || data.amount === null) {
        errors.amount = 'Amount is required';
        valid = false;
    } else if (typeof data.amount !== 'number') {
        errors.amount = 'Amount must be a number';
        valid = false;
    }

    if (!data.type || !['income', 'expense'].includes(data.type.toLowerCase())) {
        errors.type = 'Type must be either "income" or "expense"';
        valid = false;
    }

    return { valid, errors };
};