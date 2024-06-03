import React, { useEffect, useState } from "react";
import { Button, Select, Row, Col } from "antd";
import { useTranslation } from "react-i18next";
import "./shape.scss";

interface ButtonProps {
  label: string;
  shape:
    | "rectangle"
    | "circle"
    | "square"
    | "trapezoid"
    | "oval"
    | "parallelogram"
    | "triangle";
}

const { Option } = Select;

const Shape: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");
  const [languageOptions, setLanguageOptions] = useState({
    en: t("English"),
    th: t("Thai"),
  });
  const [buttons, setButtons] = useState<Array<ButtonProps>>([
    { label: "Button 1", shape: "square" },
    { label: "Button 2", shape: "circle" },
    { label: "Button 3", shape: "oval" },
    { label: "Button 4", shape: "trapezoid" },
    { label: "Button 5", shape: "rectangle" },
    { label: "Button 6", shape: "parallelogram" },
  ]);
  const [isSwapped, setIsSwapped] = useState(false);

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

  const swapPositions = () => {
    setIsSwapped(!isSwapped);
  };
  const moveButtons = (direction: "left" | "right") => {
    if (direction === "left") {
      setButtons((prevButtons) => [...prevButtons.slice(1), prevButtons[0]]);
    } else {
      setButtons((prevButtons) => [
        prevButtons[prevButtons.length - 1],
        ...prevButtons.slice(0, prevButtons.length - 1),
      ]);
    }
  };
  const shuffleButtons = () => {
    const shuffledButtons = [...buttons].sort(() => Math.random() - 0.5);
    setButtons(shuffledButtons);
  };

  return (
    <div className="App">
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
              <Option value="en">{languageOptions.en}</Option>
              <Option value="th">{languageOptions.th}</Option>
            </Select>
          </Col>
        </Row>
      </header>
      <div className="App-body">
        <div className="button-container">
          <Button
            className={`button-shape`}
            onClick={() => moveButtons("left")}
          >
            <div className={`shape triangle-left`}></div>
          </Button>
          <Button className={`buttons-shape`} onClick={swapPositions}>
            <div className={`left-content`}>
              <div className={`shape triangle-down`}></div>
            </div>
            <div className={`right-content`}>
              <div className={`shape triangle`}></div>
            </div>
          </Button>

          <Button
            className={`button-shape`}
            onClick={() => moveButtons("right")}
          >
            <div className={`shape triangle-right`}></div>
          </Button>
        </div>
        <Row
          gutter={[10, 10]}
          justify="center"
          style={{ marginBottom: "10px" }}
        >
          {isSwapped ? (
            <>
              {buttons.slice(0, 3).map((button, index) => (
                <Col span={4} key={index}>
                  <button className={`button-shape`} onClick={shuffleButtons}>
                    <div className={`shape ${button.shape}`}></div>
                    {t(button.label)}
                  </button>
                </Col>
              ))}
              <Col span={4}></Col>
            </>
          ) : (
            <>
              <Col span={4}></Col>
              {buttons.slice(0, 3).map((button, index) => (
                <Col span={4} key={index}>
                  <button className={`button-shape`} onClick={shuffleButtons}>
                    <div className={`shape ${button.shape}`}></div>
                    {t(button.label)}
                  </button>
                </Col>
              ))}
            </>
          )}
        </Row>
        <Row gutter={[10, 10]} justify="center">
          {isSwapped ? (
            <>
              <Col span={4}></Col>
              {buttons.slice(3).map((button, index) => (
                <Col span={4} key={index}>
                  <button className={`button-shape`} onClick={shuffleButtons}>
                    <div className={`shape ${button.shape}`}></div>
                    {t(button.label)}
                  </button>
                </Col>
              ))}
            </>
          ) : (
            <>
              {buttons.slice(3).map((button, index) => (
                <Col span={4} key={index}>
                  <button className={`button-shape`} onClick={shuffleButtons}>
                    <div className={`shape ${button.shape}`}></div>
                    {t(button.label)}
                  </button>
                </Col>
              ))}
              <Col span={4}></Col>
            </>
          )}
        </Row>
      </div>
    </div>
  );
};

export default Shape;