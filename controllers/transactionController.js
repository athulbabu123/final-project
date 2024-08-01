const transactionModel = require('../models/transactionModel');
const moment = require('moment');

const getAllTransaction = async (req, res) => {
  try {
    const { frequency, selectedDate, userid, type } = req.body;

    let dateFilter = {};

    if (frequency !== 'custom') {
      dateFilter = {
        date: {
          $gt: moment().subtract(Number(frequency), 'd').toDate(),
        },
      };
    } else {
      dateFilter = {
        date: {
          $gte: moment(selectedDate[0]).startOf('day').toDate(),
          $lte: moment(selectedDate[1]).endOf('day').toDate(),
        },
      };
    }

    console.log('Request Parameters:', { frequency, selectedDate, userid, type });
    console.log('Date Filter:', dateFilter);

    const transactions = await transactionModel.find({
      userid,
      ...dateFilter,
      ...(type !== 'all' && { type }),
    });

    console.log('Fetched Transactions:', transactions);

    res.status(200).json(transactions);
  } catch (error) {
    console.error('Error Fetching Transactions:', error);
    res.status(500).json({ message: 'Failed to fetch transactions', error });
  }
};


const deleteTransaction =async(req,res)=>{
    try{
                await transactionModel.findOneAndDelete({_id:req.body.transactionId})
                res.status(200).send('transaction deleted');
    }
     catch(error){
        console.log(error);
        res.status(500).json(error);
     }

}

const editTransaction = async (req, res) => {
  try {
    await transactionModel.findOneAndUpdate({ _id: req.body.transactionId }, req.body.payload);
    res.status(200).send('Edit Successfully');
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const addTransaction = async (req, res) => {
  try {
    const newTransaction = new transactionModel(req.body);
    await newTransaction.save();
    res.status(201).send('Transaction created');
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { getAllTransaction, addTransaction, editTransaction,deleteTransaction };
