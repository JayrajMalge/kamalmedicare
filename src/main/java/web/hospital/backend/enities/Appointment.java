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
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import java.io.Serializable;
import java.util.Date;

/**
 *
 * @author Jayraj Malge
 */
@Entity
@Table(name = "appointment")
@NamedQueries({
    @NamedQuery(name = "Appointment.findAll", query = "SELECT a FROM Appointment a"),
    @NamedQuery(name = "Appointment.findByAppointmentid", query = "SELECT a FROM Appointment a WHERE a.appointmentid = :appointmentid"),
    @NamedQuery(name = "Appointment.findByPatient", query = "SELECT a FROM Appointment a WHERE a.patient = :patient"),
    @NamedQuery(name = "Appointment.findByDoctor", query = "SELECT a FROM Appointment a WHERE a.doctor = :doctor"),
    @NamedQuery(name = "Appointment.findByAppointmentdate", query = "SELECT a FROM Appointment a WHERE a.appointmentdate = :appointmentdate"),
    @NamedQuery(name = "Appointment.findByStatus", query = "SELECT a FROM Appointment a WHERE a.status = :status")})
public class Appointment implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "appointmentid")
    private Integer appointmentid;
    @Column(name = "patient")
    private Integer patient;
    @Column(name = "doctor")
    private Integer doctor;
    @Column(name = "appointmentdate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date appointmentdate;
    @Column(name = "status")
    private String status;

    public Appointment() {
    }

    public Appointment(Integer appointmentid) {
        this.appointmentid = appointmentid;
    }

    public Integer getAppointmentid() {
        return appointmentid;
    }

    public void setAppointmentid(Integer appointmentid) {
        this.appointmentid = appointmentid;
    }

    public Integer getPatient() {
        return patient;
    }

    public void setPatient(Integer patient) {
        this.patient = patient;
    }

    public Integer getDoctor() {
        return doctor;
    }

    public void setDoctor(Integer doctor) {
        this.doctor = doctor;
    }

    public Date getAppointmentdate() {
        return appointmentdate;
    }

    public void setAppointmentdate(Date appointmentdate) {
        this.appointmentdate = appointmentdate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (appointmentid != null ? appointmentid.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Appointment)) {
            return false;
        }
        Appointment other = (Appointment) object;
        if ((this.appointmentid == null && other.appointmentid != null) || (this.appointmentid != null && !this.appointmentid.equals(other.appointmentid))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "web.hospital.backend.enities.Appointment[ appointmentid=" + appointmentid + " ]";
    }
    
}
