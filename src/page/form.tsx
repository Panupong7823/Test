import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Select,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Button,
  Checkbox,
  Table,
  Divider,
} from "antd";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";
import { RootState, AppDispatch } from "@/store";
import {
  updateField,
  resetForm,
  FormState,
  updateFormData,
  deleteFormData,
} from "../features/form/formSlice";
import "./form.scss";

const { Option } = Select;

const FormComponent: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");
  const [languageOptions, setLanguageOptions] = useState({
    en: t("English"),
    th: t("Thai"),
  });
  const dispatch = useDispatch<AppDispatch>();
  const formState = useSelector((state: RootState) => state.form);
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState<FormState[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  type FormField =
    | "prefix"
    | "firstName"
    | "lastName"
    | "birthDate"
    | "nationality"
    | "idCard"
    | "gender"
    | "phoneCountry"
    | "phoneNumber"
    | "passport"
    | "expectedSalary";

  const handleChange = (field: FormField, value: any) => {
    dispatch(updateField({ field, value }));
  };

  const handleLanguage = (value: string) => {
    setSelectedLanguage(value);
    i18n.changeLanguage(value);
  };

  useEffect(() => {
    setSelectedLanguage(i18n.language);
  }, [i18n.language]);

  useEffect(() => {
    setLanguageOptions({
      en: t("English"),
      th: t("Thai"),
    });
  }, [i18n.language, t]);

  const handleSubmit = () => {
    const formData: FormState = {
      key: uuidv4(),
      prefix: formState.prefix,
      firstName: formState.firstName,
      lastName: formState.lastName,
      birthDate: formState.birthDate,
      nationality: formState.nationality,
      idCard: formState.idCard,
      gender: formState.gender,
      phoneCountry: formState.phoneCountry,
      phoneNumber: formState.phoneNumber,
      passport: formState.passport,
      expectedSalary: formState.expectedSalary,
      formData: [],
    };

    dispatch(updateFormData([formData]));

    const newData = [...dataSource, formData];
    setDataSource(newData);
    localStorage.setItem("formData", JSON.stringify(newData));

    form.resetFields();
  };
  const handleReset = () => {
    console.log("Resetting form");
    dispatch(resetForm());
    form.resetFields();
  };

  const handleDelete = (record: FormState) => {
    const newData = dataSource.filter((item) => item !== record);
    setDataSource(newData);
    localStorage.setItem("formData", JSON.stringify(newData));
    dispatch(deleteFormData());
  };

  const handleBulkDelete = () => {
    const newData = dataSource.filter(
      (item) => !selectedRowKeys.includes(item.key)
    );
    setDataSource(newData);
    setSelectedRowKeys([]);
    localStorage.setItem("formData", JSON.stringify(newData));
    dispatch(deleteFormData());
  };

  const columns = [
    {
      title: "ชื่อ",
      dataIndex: "firstName",
      key: "firstName",
      sorter: (a: FormState, b: FormState) =>
        a.firstName.localeCompare(b.firstName),
    },
    {
      title: "นามสกุล",
      dataIndex: "lastName",
      key: "lastName",
      sorter: (a: FormState, b: FormState) =>
        a.lastName.localeCompare(b.lastName),
    },
    {
      title: "เพศ",
      dataIndex: "gender",
      key: "gender",
      sorter: (a: FormState, b: FormState) => a.gender.localeCompare(b.gender),
    },
    {
      title: "สัญชาติ",
      dataIndex: "nationality",
      key: "nationality",
      sorter: (a: FormState, b: FormState) =>
        a.nationality.localeCompare(b.nationality),
    },
    {
      title: "Actions",
      dataIndex: "",
      key: "actions",
      render: (_: any, record: FormState) => (
        <Button onClick={() => handleDelete(record)}>Delete</Button>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("formData") || "[]");
    setDataSource(storedData);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Row justify="space-between" align="middle" className="header-row">
          <Col>
            <p className="layout-text">{t("Form & Table")}</p>
          </Col>
          <Col>
            <Select
              value={selectedLanguage}
              onChange={handleLanguage}
              className="language-select"
            >
              <Option value="en">{languageOptions.en}</Option>
              <Option value="th">{languageOptions.th}</Option>
            </Select>
          </Col>
        </Row>
        <div className="App-body">
          <div className="form-wrapper">
            <Form onFinish={handleSubmit} initialValues={formState} form={form}>
              <Row gutter={8} align="middle">
                <Col span={4}>
                  <Form.Item
                    label={t("Title")}
                    name="prefix"
                    rules={[
                      { required: true, message: t("โปรดระบุคำนำหน้า!") },
                    ]}
                  >
                    <Select onChange={(value) => handleChange("prefix", value)}>
                      <Option value="Mr.">{t("Mr.")}</Option>
                      <Option value="Mrs.">{t("Mrs.")}</Option>
                      <Option value="Ms.">{t("Ms.")}</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item
                    label={t("firstName")}
                    name="firstName"
                    rules={[{ required: true, message: "โปรดระบุชื่อ!" }]}
                  >
                    <Input
                      onChange={(e) =>
                        handleChange("firstName", e.target.value)
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item
                    label={t("lastName")}
                    name="lastName"
                    rules={[{ required: true, message: "โปรดระบุนามสกุล!" }]}
                  >
                    <Input
                      onChange={(e) => handleChange("lastName", e.target.value)}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={8} align="middle">
                <Col span={4}>
                  <Form.Item
                    label={t("birthDate")}
                    name="birthDate"
                    rules={[{ required: true, message: "โปรดระบุวันเกิด" }]}
                  >
                    <DatePicker
                      format="DD/MM/YYYY"
                      onChange={(date, dateString) =>
                        handleChange("birthDate", dateString)
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item
                    label={t("nationality")}
                    name="nationality"
                    rules={[{ required: true, message: "โปรดระบุสํญชาติ" }]}
                  >
                    <Select
                      onChange={(value) => handleChange("nationality", value)}
                    >
                      <Option value="ไทย">ไทย</Option>
                      <Option value="ฝรั่งเศส">ฝรั่งเศส</Option>
                      <Option value="อเมริกา">อเมริกา</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={8} align="middle">
                <Col span={18}>
                  <Form.Item label={t("idCard")} name="idCard">
                    <Input.Group compact style={{ display: "flex" }}>
                      <Input style={{ flex: "20%" }} maxLength={1} />
                      <Divider
                        type="vertical"
                        style={{
                          height: "24px",
                          flex: "auto",
                          textAlign: "center",
                        }}
                      />
                      <span
                        style={{
                          marginLeft: "5px",
                          marginRight: "10px",
                          verticalAlign: "middle",
                        }}
                      >
                        -
                      </span>
                      <Input style={{ flex: "50%" }} maxLength={4} />
                      <Divider
                        type="vertical"
                        style={{
                          height: "24px",
                          flex: "auto",
                          textAlign: "center",
                        }}
                      />
                      <span
                        style={{
                          marginLeft: "5px",
                          marginRight: "10px",
                          verticalAlign: "middle",
                        }}
                      >
                        -
                      </span>
                      <Input style={{ flex: "60%" }} maxLength={5} />
                      <Divider
                        type="vertical"
                        style={{
                          height: "24px",
                          flex: "auto",
                          textAlign: "center",
                        }}
                      />
                      <span
                        style={{
                          marginLeft: "5px",
                          marginRight: "10px",
                          verticalAlign: "middle",
                        }}
                      >
                        -
                      </span>
                      <Input style={{ flex: "30%" }} maxLength={2} />
                      <Divider
                        type="vertical"
                        style={{
                          height: "24px",
                          flex: "auto",
                          textAlign: "center",
                        }}
                      />
                      <span
                        style={{
                          marginLeft: "5px",
                          marginRight: "10px",
                          verticalAlign: "middle",
                        }}
                      >
                        -
                      </span>
                      <Input style={{ flex: "20%" }} maxLength={1} />
                    </Input.Group>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={8}>
                <Col span={6}>
                  <Form.Item
                    label={t("gender")}
                    name="gender"
                    rules={[{ required: true, message: "กรุณาเลือกเพศ" }]}
                  >
                    <Checkbox.Group
                      onChange={(checkedValues) =>
                        handleChange("gender", checkedValues)
                      }
                    >
                      <Checkbox value="male">{t("male")}</Checkbox>
                      <Checkbox value="female">{t("female")}</Checkbox>
                      <Checkbox value="unsex">{t("unsex")}</Checkbox>
                    </Checkbox.Group>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={8}>
                <Col span={16}>
                  <Form.Item label={t("phoneNumber")} name="phoneNumber">
                    <Input.Group
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Select
                        style={{ width: "40%" }}
                        onChange={(value) =>
                          handleChange("phoneCountry", value)
                        }
                      >
                        <Option value="th">
                          <img
                            src="/images/th.jpg"
                            alt=""
                            style={{ width: "24px", verticalAlign: "middle" }}
                          />
                          (+66)
                        </Option>
                        <Option value="us">
                          <img
                            src="/images/us.jpg"
                            alt=""
                            style={{ width: "24px", verticalAlign: "middle" }}
                          />
                          (+1)
                        </Option>
                        <Option value="fr">
                          <img
                            src="/images/fr.jpg"
                            alt=""
                            style={{ width: "24px", verticalAlign: "middle" }}
                          />
                          (+33)
                        </Option>
                      </Select>
                      <span
                        style={{ margin: "0 5px", verticalAlign: "middle" }}
                      >
                        -
                      </span>
                      <Input
                        style={{ width: "80%" }}
                        onChange={(e) =>
                          handleChange("phoneNumber", e.target.value)
                        }
                      />
                    </Input.Group>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={8} align="middle">
                <Col span={12}>
                  <Form.Item label={t("passport")} name="passport">
                    <InputNumber
                      style={{ width: "100%" }}
                      onChange={(value) => handleChange("passport", value)}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={8} align="middle">
                <Col span={12}>
                  <Form.Item
                    label={t("expectedSalary")}
                    name="expectedSalary"
                    rules={[
                      {
                        required: true,
                        message: "กรุณากรอกเงินเดือนที่คาดหวัง ",
                      },
                    ]}
                  >
                    <InputNumber
                      style={{ width: "100%" }}
                      onChange={(value) =>
                        handleChange("expectedSalary", value)
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Button onClick={handleReset}>{t("reset")}</Button>
                </Col>
                <Col span={4}>
                  <Button htmlType="submit">{t("submit")}</Button>
                </Col>
              </Row>
            </Form>
          </div>
          <div
            style={{
              margin: 16,
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <Button onClick={handleBulkDelete}>{t("delete")}</Button>
          </div>
          <Table
            rowSelection={rowSelection}
            dataSource={dataSource}
            columns={columns}
            pagination={{ pageSize: 5 }}
          />
        </div>
      </header>
    </div>
  );
};

export default FormComponent;
