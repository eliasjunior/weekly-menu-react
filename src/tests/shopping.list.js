const shoppingListTestCase = {
    "case1": {
        "shoppinpListData": {
            "recipes": [
                {
                    "name": "Pie",
                    "_id": "5b997232fb7dfee0ed8180ed",
                    "categories": [
                        {
                            "name": "Meat",
                            "_id": "5b9971bbfb7dfee0ed8180e8",
                            "products": [
                                {
                                    "name": "Chicken",
                                    "_id": "5b9971c2fb7dfee0ed8180e9",
                                    "completed": false
                                }
                            ]
                        }
                    ]
                }
            ],
            "categories": [
                {
                    "name": "Drinks",
                    "_id": "5b997166fb7dfee0ed8180e0",
                    "products": [
                        {
                            "name": "Milk",
                            "_id": "5b99716ffb7dfee0ed8180e1",
                            "completed": false
                        }
                    ]
                },
                {
                    "name": "Snacks",
                    "_id": "5b997184fb7dfee0ed8180e4",
                    "products": [
                        {
                            "name": "Chips",
                            "_id": "5b99718bfb7dfee0ed8180e5",
                            "completed": false
                        }
                    ]
                },

            ]
        },
        "expected": [
            {
                "name": "Drinks",
                "_id": "5b997166fb7dfee0ed8180e0",
                "products": [
                    {
                        "name": "Milk",
                        "_id": "5b99716ffb7dfee0ed8180e1",
                        "completed": false
                    }
                ]
            },
            {
                "name": "Snacks",
                "_id": "5b997184fb7dfee0ed8180e4",
                "products": [
                    {
                        "name": "Chips",
                        "_id": "5b99718bfb7dfee0ed8180e5",
                        "completed": false
                    }
                ]
            },
            {
                "name": "Meat",
                "_id": "5b9971bbfb7dfee0ed8180e8",
                "products": [
                    {
                        "name": "Chicken",
                        "_id": "5b9971c2fb7dfee0ed8180e9",
                        "completed": false,
                        "recName": "Pie",
                        "recId": "5b997232fb7dfee0ed8180ed"
                    }
                ]
            }
        ]
    },
    "case2": {
        "shoppinpListData": {
            "recipes": [
                {
                    "name": "Pie",
                    "_id": "5b997232fb7dfee0ed8180ed",
                    "categories": [
                        {
                            "name": "Meat",
                            "_id": "5b9971bbfb7dfee0ed8180e8",
                            "products": [
                                {
                                    "name": "Chicken",
                                    "_id": "5b9971c2fb7dfee0ed8180e9",
                                    "completed": false
                                }
                            ]
                        }
                    ]
                }
            ],
            "categories": []
        },
        "expected": [
            {
                "name": "Meat",
                "_id": "5b9971bbfb7dfee0ed8180e8",
                "products": [
                    {
                        "name": "Chicken",
                        "_id": "5b9971c2fb7dfee0ed8180e9",
                        "completed": false,
                        "recName": "Pie",
                        "recId": "5b997232fb7dfee0ed8180ed"
                    }
                ]
            }
        ]
    },
    "case3": {
        "shoppinpListData": {
            "recipes": [
                {
                    "name": "Pie",
                    "_id": "5b997232fb7dfee0ed8180ed",
                    "categories": [
                        {
                            "name": "Meat",
                            "_id": "5b9971bbfb7dfee0ed8180e8",
                            "products": [
                                {
                                    "name": "Chicken",
                                    "_id": "5b9971c2fb7dfee0ed8180e9",
                                    "completed": false
                                }
                            ]
                        }
                    ]
                }
            ],
            "categories": [
                {
                    "name": "Meat",
                    "_id": "5b9971bbfb7dfee0ed8180e8",
                    "products": [
                        {
                            "name": "Chicken",
                            "_id": "5b9971c2fb7dfee0ed8180e9",
                            "completed": false
                        }
                    ]
                },
                {
                    "name": "Snacks",
                    "_id": "5b997184fb7dfee0ed8180e4",
                    "products": [
                        {
                            "name": "Chips",
                            "_id": "5b99718bfb7dfee0ed8180e5",
                            "completed": false
                        }
                    ]
                },
            ]
        },
        "expected": [
            {
                "name": "Meat",
                "_id": "5b9971bbfb7dfee0ed8180e8",
                "products": [
                    {
                        "name": "Chicken",
                        "_id": "5b9971c2fb7dfee0ed8180e9",
                        "completed": false
                    },
                    {
                        "name": "Chicken",
                        "_id": "5b9971c2fb7dfee0ed8180e9",
                        "completed": false,
                        "recName": "Pie",
                        "recId": "5b997232fb7dfee0ed8180ed"
                    }
                ]
            },
            {
                "name": "Snacks",
                "_id": "5b997184fb7dfee0ed8180e4",
                "products": [
                    {
                        "name": "Chips",
                        "_id": "5b99718bfb7dfee0ed8180e5",
                        "completed": false
                    }
                ]
            },
        ]
    },
    "caseAttr": {
        "recipes": [
            {
                "name": "Pie",
                "_id": "5b997232fb7dfee0ed8180ed",
                "categories": [
                    {
                        "name": "Meat",
                        "_id": "5b9971bbfb7dfee0ed8180e8",
                        "products": [
                            {
                                "name": "Chicken",
                                "_id": "5b9971c2fb7dfee0ed8180e9",
                                "completed": false
                            }
                        ]
                    }
                ]
            }
        ],
        "expected": [
            {
                "name": "Pie",
                "_id": "5b997232fb7dfee0ed8180ed",
                "categories": [
                    {
                        "name": "Meat",
                        "_id": "5b9971bbfb7dfee0ed8180e8",
                        "products": [
                            {
                                "name": "Chicken",
                                "_id": "5b9971c2fb7dfee0ed8180e9",
                                "completed": false,
                                "recName": "Pie",
                                "recId": "5b997232fb7dfee0ed8180ed"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    "case4": {
        "shoppinpListData": {
            "recipes": [
                {
                    "name": "Pie",
                    "_id": "5b997232fb7dfee0ed8180ed",
                    "categories": [
                        {
                            "name": "Meat",
                            "_id": "5b9971bbfb7dfee0ed8180e8",
                            "products": [
                                {
                                    "name": "Chicken",
                                    "_id": "5b9971c2fb7dfee0ed8180e9",
                                    "completed": false
                                }
                            ]
                        },
                        {
                            "name": "Snacks",
                            "_id": "5b997184fb7dfee0ed8180e4",
                            "products": [
                                {
                                    "name": "Chips",
                                    "_id": "5b99718bfb7dfee0ed8180e5",
                                    "completed": false
                                }
                            ]
                        },
                        {
                            "name": "Drinks",
                            "_id": "5b997166fb7dfee0ed8180e0",
                            "products": [
                                {
                                    "name": "Juice",
                                    "_id": "5b997178fb7dfee0ed8180e3",
                                    "completed": false
                                }
                            ]
                        }
                    ]
                }
            ],
            "categories": [
                {
                    "name": "Drinks",
                    "_id": "5b997166fb7dfee0ed8180e0",
                    "products": [
                        {
                            "name": "Milk",
                            "_id": "5b99716ffb7dfee0ed8180e1",
                            "completed": false
                        }
                    ]
                },
                {
                    "name": "Snacks",
                    "_id": "5b997184fb7dfee0ed8180e4",
                    "products": [
                        {
                            "name": "Chips",
                            "_id": "5b99718bfb7dfee0ed8180e5",
                            "completed": false
                        }
                    ]
                },
                {
                    "name": "Meat",
                    "_id": "5b9971bbfb7dfee0ed8180e8",
                    "products": [
                        {
                            "name": "Chicken",
                            "_id": "5b9971c2fb7dfee0ed8180e9",
                            "completed": false
                        }
                    ]
                }
            ]
        },
        "expected": [
            {
                "_id": "5b997166fb7dfee0ed8180e0",
                "name": "Drinks",
                "products": [
                    {
                        "_id": "5b997178fb7dfee0ed8180e3",
                        "completed": false,
                        "name": "Juice",
                        "recId": "5b997232fb7dfee0ed8180ed",
                        "recName": "Pie"
                    },
                    {
                        "_id": "5b99716ffb7dfee0ed8180e1",
                        "completed": false,
                        "name": "Milk"
                    }
                ]
            },
            {
                "_id": "5b9971bbfb7dfee0ed8180e8",
                "name": "Meat",
                "products": [
                    {
                        "_id": "5b9971c2fb7dfee0ed8180e9",
                        "completed": false,
                        "name": "Chicken"
                    },
                    {
                        "_id": "5b9971c2fb7dfee0ed8180e9",
                        "completed": false,
                        "name": "Chicken",
                        "recId": "5b997232fb7dfee0ed8180ed",
                        "recName": "Pie"
                    }
                ]
            },
            {
                "_id": "5b997184fb7dfee0ed8180e4",
                "name": "Snacks",
                "products": [
                    {
                        "_id": "5b99718bfb7dfee0ed8180e5",
                        "completed": false,
                        "name": "Chips"
                    },
                    {
                        "_id": "5b99718bfb7dfee0ed8180e5",
                        "completed": false,
                        "name": "Chips",
                        "recId": "5b997232fb7dfee0ed8180ed",
                        "recName": "Pie"
                    }
                ]
            }
        ]
    },
    "case5": {
        "shoppinpListData": {
            "recipes": [
                {
                    "name": "Pie",
                    "_id": "5b997232fb7dfee0ed8180ed",
                    "categories": [
                        {
                            "name": "Meat",
                            "_id": "5b9971bbfb7dfee0ed8180e8",
                            "products": [
                                {
                                    "name": "Chicken",
                                    "_id": "5b9971c2fb7dfee0ed8180e9",
                                    "completed": false
                                }
                            ]
                        },
                        {
                            "name": "Meat",
                            "_id": "5b9971bbfb7dfee0ed8180e8",
                            "products": [
                                {
                                    "name": "Beef",
                                    "_id": "5b9971c2fb7dfee0ed818021",
                                    "completed": false
                                }
                            ]
                        },
                        {
                            "name": "Drinks",
                            "_id": "5b997166fb7dfee0ed8180e0",
                            "products": [
                                {
                                    "name": "Juice",
                                    "_id": "5b997178fb7dfee0ed8180e3",
                                    "completed": false
                                }
                            ]
                        }
                    ]
                }
            ],
            "categories": [
                {
                    "name": "Drinks",
                    "_id": "5b997166fb7dfee0ed8180e0",
                    "products": [
                        {
                            "name": "Milk",
                            "_id": "5b99716ffb7dfee0ed8180e1",
                            "completed": false
                        }
                    ]
                }
            ]
        },
        "expected": [
            {
                "_id": "5b997166fb7dfee0ed8180e0",
                "name": "Drinks",
                "products": [
                    {
                        "name": "Juice",
                        "_id": "5b997178fb7dfee0ed8180e3",
                        "completed": false,
                        "recId": "5b997232fb7dfee0ed8180ed",
                        "recName": "Pie"
                    },
                    {
                        "_id": "5b99716ffb7dfee0ed8180e1",
                        "completed": false,
                        "name": "Milk"
                    }
                ]
            },
            {
                "_id": "5b9971bbfb7dfee0ed8180e8",
                "name": "Meat",
                "products": [
                    {
                        "name": "Beef",
                        "_id": "5b9971c2fb7dfee0ed818021",
                        "completed": false,
                        "recId": "5b997232fb7dfee0ed8180ed",
                        "recName": "Pie"
                    },
                    {
                        "name": "Chicken",
                        "_id": "5b9971c2fb7dfee0ed8180e9",
                        "completed": false,
                        "recId": "5b997232fb7dfee0ed8180ed",
                        "recName": "Pie"
                    }
                ]
            }
        ]
    }
}

export default shoppingListTestCase;