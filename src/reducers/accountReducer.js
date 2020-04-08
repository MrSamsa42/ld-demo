//dummy data:
const fakeAccounts = [
    {
        id: 1,
        name: "Clinic A",
        repName: "Johnny Faker",
        repPhone: "111-111-1111",
        repEmail: "jfaker@fake.com"
    },
    {
        id: 2,
        name: "Clinic B",
        repName: "Steve Notreal",
        repPhone: "222-222-2222",
        repEmail: "snotreal@fake.com"
    },
    {
        id: 3,
        name: "Clinic C",
        repName: "Amy Alias",
        repPhone: "333-333-3333",
        repEmail: "aalias@fake.com"
    }
]
const currentAccount = fakeAccounts[0];

const initialState = {
    accounts: fakeAccounts,
    currentAccount: currentAccount
}

const accountReducer = (state = initialState, action) => {
    if (action.type === 'CHANGE_CURRENT_ACCOUNT') {
        const newCurrentAccount = state.accounts.find( acct => acct.id == action.id ); //use '==' because id may be an int
        return {
            ...state,
            currentAccount: newCurrentAccount
        }
    }
    return state;
}

export default accountReducer;