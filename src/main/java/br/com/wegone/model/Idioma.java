package br.com.wegone.model;

public class Idioma {

    private String codigo;
    private String nome;

    public Idioma() {
        codigo = "nl";
        nome = "sem-idioma";
    }

    public Idioma construtor(String codigo, String nome) {
        this.codigo = codigo;
        this.nome = nome;
        return this;
    }

    public Idioma setCodigo(String codigo) {
        this.codigo = codigo;
        return this;
    }

    public Idioma setNome(String nome) {
        this.nome = nome;
        return this;
    }

    public String getCodigo() {
        return codigo;
    }

    public String getNome() {
        return nome;
    }

    public void imprimir() {
        System.out.printf("Código Idioma: %s | Nome Idioma: %s%n", codigo, nome);
    }
}
