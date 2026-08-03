import React from "react";
import { dummyTestimonial } from "../../assets/assets";

const TestimonialsSection = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 bg-gray-100 py-10 px-4 text-center">
      <h2 className="text-2xl font-bold text-gray-800">Testimonials</h2>
      <p className="text-gray-600">
        {" "}
        Here are what our students have to say about their learning
        experience.{" "}
      </p>
      <div className="flex  gap-4 justify-center flex-wrap">
        {dummyTestimonial.map((testimonial, index) => (
          <div key={index} className="bg-white p-4 rounded shadow w-64  ">
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-16 h-16 rounded-full mx-auto"
            />
            <p className="text-gray-500 font-semibold">— {testimonial.name}</p>
            <p className="text-gray-400"> {testimonial.role}</p>

            <p className="text-gray-700 italic">"{testimonial.feedback}"</p>
            <div>
              {[...Array(5)].map((_, index) => (
                <span key={index} className="text-yellow-500">
                  {index < testimonial.rating ? "★" : "☆"}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
