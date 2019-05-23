import React from "react";
import styled from "@emotion/styled";
import renderer from "react-test-renderer";
import serializer from "jest-emotion";
import StyleSandbox from "../StyleSandbox";

expect.addSnapshotSerializer(serializer);

it("renders correctly", () => {
  const tree = renderer
    .create(
      <StyleSandbox elementId="myId">
        <div className="myClass">test</div>
      </StyleSandbox>,
    )
    .toJSON();

  expect(tree).toMatchInlineSnapshot(`
        <div
          id="myId"
        >
          <div
            className="myClass"
          >
            test
          </div>
        </div>
    `);
});

it("renders styles correctly", () => {
  const Div = styled("div")({
    background: "white",
    color: "black",
  });

  const tree = renderer
    .create(
      <StyleSandbox elementId="myId">
        <Div>test</Div>
      </StyleSandbox>,
    )
    .toJSON();

  expect(tree).toMatchInlineSnapshot(`
        #myId .emotion-0 {
          background: white;
          color: black;
        }

        <div
          id="myId"
        >
          <div
            className="emotion-0"
          >
            test
          </div>
        </div>
    `);
});

it("renders pseudoclasses correctly", () => {
  const A = styled("a")({
    color: "blue",
    "&:hover, &:focus": {
      color: "orange",
    },
    "&, &:hover, &:focus": {
      textDecoration: "underline",
    },
  });

  const tree = renderer
    .create(
      <StyleSandbox elementId="myId">
        <A>test</A>
      </StyleSandbox>,
    )
    .toJSON();

  expect(tree).toMatchInlineSnapshot(`
        #myId .emotion-0 {
          color: blue;
        }

        #myId .emotion-0:hover,
        #myId .emotion-0:focus {
          color: orange;
        }

        #myId .emotion-0,
        #myId .emotion-0:hover,
        #myId .emotion-0:focus {
          -webkit-text-decoration: underline;
          text-decoration: underline;
        }

        <div
          id="myId"
        >
          <a
            className="emotion-0"
          >
            test
          </a>
        </div>
    `);
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

  const tree = renderer
    .create(
      <StyleSandbox elementId="myId">
        <Div>test</Div>
      </StyleSandbox>,
    )
    .toJSON();

  expect(tree).toMatchInlineSnapshot(`
        #myId .emotion-0::before {
          content: "prefix";
        }

        #myId .emotion-0::after {
          content: "suffix";
        }

        <div
          id="myId"
        >
          <div
            className="emotion-0"
          >
            test
          </div>
        </div>
    `);
});

it("renders descendent elements correctly", () => {
  const Div = styled("div")({
    "& ~ span": {
      color: "red",
    },
    "a:hover + &": {
      color: "pink",
    },
  });

  const tree = renderer
    .create(
      <StyleSandbox elementId="myId">
        <Div>test</Div>
      </StyleSandbox>,
    )
    .toJSON();

  expect(tree).toMatchInlineSnapshot(`
    #myId .emotion-0 ~ span {
      color: red;
    }

    #myId a:hover + .emotion-0 {
      color: pink;
    }

    <div
      id="myId"
    >
      <div
        className="emotion-0"
      >
        test
      </div>
    </div>
  `);
});
