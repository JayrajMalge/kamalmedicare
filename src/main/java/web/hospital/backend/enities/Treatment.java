/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package web.hospital.backend.enities;

import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.NamedQueries;
import jakarta.persistence.NamedQuery;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 *
 * @author Jayraj Malge
 */
@Entity
@Table(name = "treatment")
@NamedQueries({
    @NamedQuery(name = "Treatment.findAll", query = "SELECT t FROM Treatment t"),
    @NamedQuery(name = "Treatment.findByTreatmentid", query = "SELECT t FROM Treatment t WHERE t.treatmentid = :treatmentid"),
    @NamedQuery(name = "Treatment.findByTittle", query = "SELECT t FROM Treatment t WHERE t.tittle = :tittle"),
    @NamedQuery(name = "Treatment.findByDescription", query = "SELECT t FROM Treatment t WHERE t.description = :description"),
    @NamedQuery(name = "Treatment.findByDoctor", query = "SELECT t FROM Treatment t WHERE t.doctor = :doctor"),
    @NamedQuery(name = "Treatment.findByPatient", query = "SELECT t FROM Treatment t WHERE t.patient = :patient"),
    @NamedQuery(name = "Treatment.findByCost", query = "SELECT t FROM Treatment t WHERE t.cost = :cost"),
    @NamedQuery(name = "Treatment.findByTratmentdate", query = "SELECT t FROM Treatment t WHERE t.tratmentdate = :tratmentdate")})
public class Treatment implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "treatmentid")
    private Integer treatmentid;
    @Column(name = "tittle")
    private String tittle;
    @Column(name = "description")
    private String description;
    @Column(name = "doctor")
    private Integer doctor;
    @Column(name = "patient")
    private Integer patient;
    @Column(name = "cost")
    private Integer cost;
    @Column(name = "tratmentdate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date tratmentdate;
    @OneToMany(mappedBy = "treatmentid")
    private List<Casestudies> casestudiesList;

    public Treatment() {
    }

    public Treatment(Integer treatmentid) {
        this.treatmentid = treatmentid;
    }

    public Integer getTreatmentid() {
        return treatmentid;
    }

    public void setTreatmentid(Integer treatmentid) {
        this.treatmentid = treatmentid;
    }

    public String getTittle() {
        return tittle;
    }

    public void setTittle(String tittle) {
        this.tittle = tittle;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getDoctor() {
        return doctor;
    }

    public void setDoctor(Integer doctor) {
        this.doctor = doctor;
    }

    public Integer getPatient() {
        return patient;
    }

    public void setPatient(Integer patient) {
        this.patient = patient;
    }

    public Integer getCost() {
        return cost;
    }

    public void setCost(Integer cost) {
        this.cost = cost;
    }

    public Date getTratmentdate() {
        return tratmentdate;
    }

    public void setTratmentdate(Date tratmentdate) {
        this.tratmentdate = tratmentdate;
    }

    public List<Casestudies> getCasestudiesList() {
        return casestudiesList;
    }

    public void setCasestudiesList(List<Casestudies> casestudiesList) {
        this.casestudiesList = casestudiesList;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (treatmentid != null ? treatmentid.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Treatment)) {
            return false;
        }
        Treatment other = (Treatment) object;
        if ((this.treatmentid == null && other.treatmentid != null) || (this.treatmentid != null && !this.treatmentid.equals(other.treatmentid))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "web.hospital.backend.enities.Treatment[ treatmentid=" + treatmentid + " ]";
    }
    
}
