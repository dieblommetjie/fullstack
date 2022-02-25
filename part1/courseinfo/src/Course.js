import React from 'react'

const Course = ({course}) => (
    <div>
    <Header key ={course.id} course={course.name} />
    <Content key ={course.id} parts={course.parts} />
    <Total key= {course.id} parts={course.parts} />
    </div>
)

const Header = ({ course }) => <h1>{course}</h1>;

const Part = ({ name, exercises }) => (
  <p>
    {name}: {exercises}
  </p>
);

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => 
        <Part key={part.id} name={part.name} exercises={part.exercises} />
  )}
    </div>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce((total, part) => total + part.exercises, 0);

  return <div><strong>Total of {total} exercises</strong></div>;
};

export default Course