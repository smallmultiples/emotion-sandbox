import React from "react";
import styled from "@emotion/styled";
import renderer from "react-test-renderer";
import serializer from "jest-emotion";
import StyleSandbox from "../StyleSandbox";

expect.addSnapshotSerializer(serializer);

it("renders correctly", () => {
  const tree = renderer.create(
    <StyleSandbox elementId="myId">
      <div className="myClass">test</div>
    </StyleSandbox>,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

it("renders styles correctly", () => {
  const Div = styled("div")({
    background: "white",
    color: "black",
  });

  const tree = renderer.create(
    <StyleSandbox elementId="myId">
      <Div>test</Div>
    </StyleSandbox>,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

it("renders pseudoclasses correctly", () => {
  const A = styled("a")({
    color: "blue",
    textDecoration: "underline",
    "&:hover, &:focus": {
      color: "orange",
    },
  });

  const tree = renderer.create(
    <StyleSandbox elementId="myId">
      <A>test</A>
    </StyleSandbox>,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

it("renders pseudoelements correctly", () => {
  const Div = styled("div")({
    "&::before": {
      content: JSON.stringify("prefix"),
    },
    "&::after": {
      content: JSON.stringify("suffix"),
    },
  });

  const tree = renderer.create(
    <StyleSandbox elementId="myId">
      <Div>test</Div>
    </StyleSandbox>,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
