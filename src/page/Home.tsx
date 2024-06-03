// Home.tsx

import React, { useEffect, useState } from "react";
import { Button, Col, Row, Select } from "antd";
import { Link } from "react-router-dom";
import "./home.scss";
import { useTranslation } from "react-i18next";

const Home: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");
  const [languageOptions, setLanguageOptions] = useState({
    en: t("English"),
    th: t("Thai"),
  });
  useEffect(() => {
    setLanguageOptions({
      en: t("English"),
      th: t("Thai"),
    });
  }, [i18n.language, t]);

  const handleChange = (value: string) => {
    setSelectedLanguage(value);
    i18n.changeLanguage(value);
  };

  useEffect(() => {
    setSelectedLanguage(i18n.language);
  }, [i18n.language]);

  return (
    <div className="homeContainer">
      <header className="App-header">
        <Row justify="space-between" align="middle" className="header-row">
          <Col>
            <p className="layout-text">{t("Layout & Style")}</p>
          </Col>
          <Col>
            <Select
              value={selectedLanguage}
              onChange={handleChange}
              className="language-select"
            >
              <Select value="en">{languageOptions.en}</Select>
              <Select value="th">{languageOptions.th}</Select>
            </Select>
          </Col>
        </Row>
      </header>
      <div className="App-body">
        <div className="buttonContainer">
          <Link to="/test1">
            <Button className="customButton">{t("Test1")}</Button>
          </Link>
          <Link to="/test2">
            <Button className="customButton">{t("Test2")}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
