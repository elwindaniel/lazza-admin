import React from "react";
import axios from "./api/axios";

export default function Elwin() {
    const [inputList, setInputList] = React.useState([
        {
            nameform_group: "",
            nameform_filter: "",
            formgroup_value: "",
            formfilter_value: "",
            formgroup_optionArray: [],
            formfilter_optionArray: [],
            formgroup_labelName: "Form Filter Group",
            formfilter_labelName: "Form Filter"
        }
    ]);

    const handleAddClick = () => {

        setInputList([
            ...inputList,
            {
                nameform_group: "",
                nameform_filter: "",
                formgroup_value: "",
                formfilter_value: "",
                formgroup_optionArray: inputList[0].formgroup_optionArray,
                formfilter_optionArray: inputList[0].formfilter_optionArray,
                formgroup_labelName: "Form Filter Group",
                formfilter_labelName: "Form Filter"
            }
        ]);
    };

    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    React.useEffect(() => {
        axios
            .get(`https://creditt3.com/lazza/api/master/getActiveFilterGroup`)
            .then(res => {
                let response = res.data;
                setInputList(inputList[0].formgroup_optionArray.push(...response));
                setInputList(inputList);
                getActiveFilterGroupByID(
                    inputList[0].formgroup_optionArray[0]._id,
                    undefined
                );
            })
            .catch(err => {
            });
        return () => {
            setInputList([]);
        };
    }, []);

    function getActiveFilterGroupByID(id, index) {
        axios
            .get(
                `https://creditt3.com/lazza/api/master/getAllActiveFilterbyGroupId/${id}`
            )
            .then(res => {
                let response = res.data;

                if (index !== undefined) {
                    setInputList((inputList[index].formfilter_optionArray = []));
                    setInputList(
                        inputList[index].formfilter_optionArray.push(...response)
                    );
                } else {
                    setInputList((inputList[0].formfilter_optionArray = []));
                    setInputList(inputList[0].formfilter_optionArray.push(...response));
                }

                setInputList(inputList);
            })
            .catch(err => {
            });
    }

    function ChangeHandler(event, filterType, index) {
        // setInputList((inputList[0].formgroup_value =event.target.value));
        setInputList((inputList[index].formgroup_value = ""));
        if (filterType === "formgroup") {
            getActiveFilterGroupByID(event.target.value, index);
            setInputList((inputList[index].formgroup_value = event.target.value));
        } else {
            setInputList((inputList[index].formfilter_value = event.target.value));
        }
        setInputList(inputList);
    }

    return (
        <div>
            {inputList && inputList.length
                ? inputList.map((dropData, index) => {
                    return (
                        <>
                            <DynamicSelectDropDown
                                key={index}
                                name={dropData.nameform_group}
                                value={dropData.formgroup_value}
                                optionArray={dropData.formgroup_optionArray}
                                labelName={dropData.formgroup_labelName}
                                onChange={e => ChangeHandler(e, "formgroup", index)}
                            />

                            <DynamicSelectDropDown
                                key={index + 1}
                                name={dropData.nameform_filter}
                                value={dropData.formfilter_value}
                                optionArray={dropData.formfilter_optionArray}
                                labelName={dropData.formfilter_labelName}
                                onChange={e => ChangeHandler(e, "Filter", index)}
                            />

                            {inputList && inputList.length !== 1 && (
                                <button
                                    className="mr10"
                                    onClick={() => handleRemoveClick(index)}
                                >
                                    Remove
                                </button>
                            )}
                            <button onClick={() => handleAddClick()}>Add</button>
                        </>
                    );
                })
                : null}
        </div>
    );
}

export const DynamicSelectDropDown = props => {
    const { name, value, onChange, optionArray, labelName } = props;
    return (
        <div>
            <label>{labelName}</label>
            <select name={name} value={value} onChange={onChange}>
                {optionArray && optionArray.length
                    ? optionArray.map((o, i) => {
                        return (
                            <option key={o.name} value={o._id}>
                                {o.name}
                            </option>
                        );
                    })
                    : null}
            </select>
        </div>
    );
};

