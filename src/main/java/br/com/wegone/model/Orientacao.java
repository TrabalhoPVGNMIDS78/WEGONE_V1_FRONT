package br.com.wegone.model;

import java.util.HashMap;
import java.util.Map;

public class Orientacao {
    
    private int id;
    private Map <Idioma, String> titulos;
    private TipoOrientacao tipo;
    private Map <Idioma, String> conteudos;

    public Orientacao(int id, TipoOrientacao tipo) {

        this.id = id;
        this.tipo = tipo;
        this.titulos = new HashMap<>();
        this.conteudos = new HashMap<>();

    }

    // Setters e Getters

    public 


}
