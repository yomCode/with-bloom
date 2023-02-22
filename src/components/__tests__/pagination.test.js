import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "../Pagination/Pagination";

describe("Pagination component", () => {
  const defaultProps = {
    handleNextClick: jest.fn(),
    handlePreviousClick: jest.fn(),
    pageNeigbors: 2,
    totalPages: 5,
    currentPage: 1,
    handleClick: jest.fn(),
  };

  it("should render the component with the given props", () => {
    render(<Pagination {...defaultProps} />);

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("should call the handleClick function when a page button is clicked", () => {
    render(<Pagination {...defaultProps} />);
    const pageButton = screen.getByText("3");

    fireEvent.click(pageButton);
    expect(defaultProps.handleClick).toHaveBeenCalledWith(3);
  });

  it("should call the handleNextClick function when the Next button is clicked", () => {
    render(<Pagination {...defaultProps} />);
    const nextButton = screen.getAllByTestId("next");

    fireEvent.click(nextButton);
    expect(defaultProps.handleNextClick).toHaveBeenCalled();
  });

  it("should call the handlePreviousClick function when the Previous button is clicked", () => {
    render(<Pagination {...defaultProps} />);
    const prevButton = screen.getAllByTestId("previous");

    fireEvent.click(prevButton);
    expect(defaultProps.handlePreviousClick).toHaveBeenCalled();
  });
});

