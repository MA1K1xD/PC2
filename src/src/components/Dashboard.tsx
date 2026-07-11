import React, {useState} from "react";
import {useNavigate} from "react-router-dom"
import api from "../api"

interface Products {
    name: string,
  description: string,
  category: string,
  price: 0.1,
  stock: 0,
  imageUrl: string,
  availability: "DISPONIBLE" | "No disponible"
}
